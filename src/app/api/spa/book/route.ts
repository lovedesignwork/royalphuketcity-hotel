import { NextRequest, NextResponse } from "next/server";
import { validateAntiSpam } from "@/lib/antispam";
import { getSpaTreatment, HOTEL_GUEST_DISCOUNT, parseDurationOptions } from "@/lib/spa-treatments";
import { EMAIL_ASSIGNMENTS } from "@/lib/email-routing";
import { escapeHtml, formText, isEmail, isFormBody, isFutureSpaSlot } from "@/lib/guest-form-validation";

const SPA_ASSIGNMENT = EMAIL_ASSIGNMENTS.spa;

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json().catch(() => null);
    if (!isFormBody(body)) {
      return NextResponse.json({ success: false, error: "Invalid booking request" }, { status: 400 });
    }
    const name = formText(body.name);
    const email = formText(body.email);
    const phone = formText(body.phone);
    const roomNumber = formText(body.roomNumber);
    const date = formText(body.date);
    const time = formText(body.time);
    const duration = formText(body.duration);
    const notes = formText(body.notes);
    const treatment = typeof body.treatmentId === "number" ? getSpaTreatment(body.treatmentId) : undefined;
    const option = treatment ? parseDurationOptions(treatment).find((item) => item.duration === duration) : undefined;

    if (!name || name.length > 150 || !isEmail(email) || !/^\+?\d[\d\s()-]{6,24}$/.test(phone) || !roomNumber || roomNumber.length > 30 || notes.length > 5000) {
      return NextResponse.json({ success: false, error: "Please provide your name, valid email and phone, and room number." }, { status: 400 });
    }
    if (!treatment || !option || !isFutureSpaSlot(date, time)) {
      return NextResponse.json({ success: false, error: "Please choose a listed treatment, duration, and a future appointment time." }, { status: 400 });
    }

    const spamCheck = await validateAntiSpam({
      honeypot: formText(body._hp),
      formLoadedAt: typeof body._ts === "number" ? body._ts : undefined,
      message: notes,
      email,
      name,
    });

    if (!spamCheck.passed) {
      return NextResponse.json(
        { success: false, error: spamCheck.reason || "Your submission was blocked" },
        { status: 400 }
      );
    }

    const service = `${treatment.name} (${option.duration})`;
    const amount = Math.round(option.price * (1 - HOTEL_GUEST_DISCOUNT));
    const guestCount = treatment.isCouple ? 2 : 1;
    const reference = `RWS${Date.now()}${Math.floor(Math.random() * 1000)}`.slice(0, 20);
    const specialRequests = [
      roomNumber ? `Room ${roomNumber}` : null,
      "Booked from hotel guest app",
      notes || null,
    ]
      .filter(Boolean)
      .join(" · ");

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      return NextResponse.json(
        { success: false, error: "Booking is not configured" },
        { status: 500 }
      );
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from("spa_reservations")
      .insert({
        reference,
        payment_ref: reference,
        guest_name: name,
        email,
        phone,
        date,
        time,
        guests: guestCount,
        service,
        occasion: "Hotel Guest (10% Discount) - Guest app",
        special_requests: specialRequests,
        amount,
        status: "new",
        payment_status: "pay_at_spa",
      })
      .select("id, reference")
      .single();

    if (error || !data) {
      console.error("spa_reservations insert:", error);
      return NextResponse.json(
        { success: false, error: "Could not save the booking" },
        { status: 500 }
      );
    }

    if (process.env.RESEND_API_KEY) {
      try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const ref = data.reference || reference;

      const notification = await resend.emails.send({
        from: "Royal Phuket City <noreply@royalphuketcity.com>",
        to: [...SPA_ASSIGNMENT.to],
        cc: [...SPA_ASSIGNMENT.cc],
        replyTo: email,
        subject: `Spa booking from guest app: ${service} - ${ref}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #8B7355; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">Royal Wellness Spa</h1>
            </div>
            <div style="padding: 24px; background: #f9f9f9;">
              <p><strong>Reference:</strong> ${ref}</p>
              <p><strong>Guest:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
              <p><strong>Room:</strong> ${escapeHtml(roomNumber)}</p>
              <p><strong>Treatment:</strong> ${escapeHtml(service)}</p>
              <p><strong>When:</strong> ${date} at ${time}</p>
              <p><strong>Amount (10% hotel guest):</strong> ${amount ?? ""}</p>
              <p><strong>Notes:</strong> ${escapeHtml(notes || "None")}</p>
              <p>Pay at spa. Source: hotel guest app.</p>
            </div>
          </div>
        `,
      });
      if (notification.error) console.error("Spa notification email:", notification.error);
      } catch (error) {
        console.error("Spa notification email failed after booking was saved:", error);
      }
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      reference: data.reference || reference,
    });
  } catch (error) {
    console.error("spa book:", error);
    return NextResponse.json(
      { success: false, error: "Could not save the booking" },
      { status: 500 }
    );
  }
}
