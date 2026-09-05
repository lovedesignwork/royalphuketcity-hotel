import { NextRequest, NextResponse } from "next/server";
import { validateAntiSpam } from "@/lib/antispam";
import { getSpaTreatment } from "@/lib/spa-treatments";
import { EMAIL_ASSIGNMENTS } from "@/lib/email-routing";

const SPA_ASSIGNMENT = EMAIL_ASSIGNMENTS.spa;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      roomNumber,
      date,
      time,
      treatmentId,
      treatmentName,
      duration,
      amount,
      guests,
      notes,
      _hp,
      _ts,
    } = body;

    const spamCheck = await validateAntiSpam({
      honeypot: _hp,
      formLoadedAt: _ts,
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

    if (!name || !email || !phone || !roomNumber || !date || !time || !treatmentName) {
      return NextResponse.json(
        { success: false, error: "Name, email, room number, date, time, and treatment are required" },
        { status: 400 }
      );
    }

    const treatment = getSpaTreatment(Number(treatmentId));
    const service = `${treatment?.name || treatmentName}${duration ? ` (${duration})` : ""}`;
    const guestCount = Number(guests) > 0 ? Number(guests) : treatment?.isCouple ? 2 : 1;
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
        amount: Number(amount) || null,
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
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const ref = data.reference || reference;

      await resend.emails.send({
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
              <p><strong>Guest:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Room:</strong> ${roomNumber || "Not given"}</p>
              <p><strong>Treatment:</strong> ${service}</p>
              <p><strong>When:</strong> ${date} at ${time}</p>
              <p><strong>Amount (10% hotel guest):</strong> ${amount ?? ""}</p>
              <p><strong>Notes:</strong> ${notes || "None"}</p>
              <p>Pay at spa. Source: hotel guest app.</p>
            </div>
          </div>
        `,
      });
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
