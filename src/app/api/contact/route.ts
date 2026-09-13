import { NextRequest, NextResponse } from "next/server";
import { validateAntiSpam } from "@/lib/antispam";
import { escapeHtml, formText, isEmail, isFormBody } from "@/lib/guest-form-validation";
import {
  assignmentForInquiryType,
  primaryMailbox,
} from "@/lib/email-routing";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json().catch(() => null);
    if (!isFormBody(body)) {
      return NextResponse.json({ error: "Invalid form submission" }, { status: 400 });
    }
    const name = formText(body.name);
    const email = formText(body.email);
    const phone = formText(body.phone);
    const subject = formText(body.subject);
    const message = formText(body.message);
    const inquiry_type = formText(body.inquiry_type) || "general";
    if (!name || !isEmail(email) || !message || name.length > 150 || phone.length > 50 || subject.length > 300 || message.length > 10000) {
      return NextResponse.json({ error: "Please provide your name, a valid email, and a message within 10,000 characters." }, { status: 400 });
    }

    // Anti-spam validation
    const spamCheck = await validateAntiSpam({
      honeypot: formText(body._hp),
      formLoadedAt: typeof body._ts === "number" ? body._ts : undefined,
      message,
      email,
      name,
    });

    if (!spamCheck.passed) {
      console.log(`Spam blocked: ${spamCheck.reason}`);
      return NextResponse.json(
        { error: spamCheck.reason || "Your submission was blocked" },
        { status: 400 }
      );
    }

    let submissionId: string | null = null;
    let staffEmailSent = false;
    let confirmationEmailSent = false;

    // Initialize Supabase client if environment variables are set
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      const { data, error: dbError } = await supabase
        .from("contact_submissions")
        .insert([
          {
            name,
            email,
            phone: phone || null,
            subject: subject || null,
            message,
            inquiry_type: inquiry_type || "general",
            status: "new",
            created_at: new Date().toISOString(),
          },
        ])
        .select("id")
        .single();

      if (dbError) {
        console.error("Supabase error:", dbError);
      } else if (data) {
        submissionId = data.id;
      }
    }

    const referenceNumber = submissionId ? `RPC-${submissionId.slice(0, 8).toUpperCase()}` : `RPC-${Date.now()}`;
    const html = { name: escapeHtml(name), email: escapeHtml(email), phone: escapeHtml(phone), subject: escapeHtml(subject), message: escapeHtml(message).replace(/\n/g, "<br />"), inquiryType: escapeHtml(inquiry_type) };

    // A saved inquiry stays accepted if an optional email notification fails.
    if (process.env.RESEND_API_KEY) {
      try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      const isEventInquiry = inquiry_type === "event" || inquiry_type === "corporate";
      const isWeddingInquiry = inquiry_type === "wedding";
      const assignment = assignmentForInquiryType(inquiry_type);
      const replyMailbox = primaryMailbox(assignment);

      // Staff notification: To = person in charge, CC = matrix copy list.
      // replyTo is the guest so staff pressing Reply reaches the customer.
      const notification = await resend.emails.send({
        from: "Royal Phuket City <noreply@royalphuketcity.com>",
        to: [...assignment.to],
        cc: [...assignment.cc],
        replyTo: email,
        subject: isWeddingInquiry
          ? `💍 New Wedding Inquiry: ${subject || "Wedding Request"} - Ref: ${referenceNumber}`
          : isEventInquiry
            ? `🎉 New Event Inquiry: ${subject || "Event Request"} - Ref: ${referenceNumber}`
            : `Contact Form: ${subject || "New Inquiry"} - ${inquiry_type || "General"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #8B7355; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">Royal Phuket City Hotel</h1>
            </div>
            <div style="padding: 30px; background-color: #f9f9f9;">
              <h2 style="color: #333; border-bottom: 2px solid #8B7355; padding-bottom: 10px;">
                ${isEventInquiry ? "New Event Inquiry" : "New Contact Form Submission"}
              </h2>
              <p style="color: #666;"><strong>Reference Number:</strong> ${referenceNumber}</p>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr><td style="padding: 8px 0; color: #333; font-weight: bold;">Name:</td><td style="padding: 8px 0; color: #666;">${html.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #333; font-weight: bold;">Email:</td><td style="padding: 8px 0; color: #666;">${html.email}</td></tr>
                <tr><td style="padding: 8px 0; color: #333; font-weight: bold;">Phone:</td><td style="padding: 8px 0; color: #666;">${html.phone || "Not provided"}</td></tr>
                <tr><td style="padding: 8px 0; color: #333; font-weight: bold;">Inquiry Type:</td><td style="padding: 8px 0; color: #666;">${html.inquiryType}</td></tr>
                ${subject ? `<tr><td style="padding: 8px 0; color: #333; font-weight: bold;">Subject:</td><td style="padding: 8px 0; color: #666;">${html.subject}</td></tr>` : ""}
              </table>
              <div style="background-color: white; padding: 20px; border-left: 4px solid #8B7355; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Message / Details:</h3>
                <p style="color: #666; line-height: 1.6;">${html.message}</p>
              </div>
              <p style="color: #888; font-size: 12px; margin-top: 30px;">
                Submitted on ${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}
              </p>
            </div>
          </div>
        `,
      });

      if (notification.error) throw new Error(notification.error.message);
      staffEmailSent = true;

      // Guest chat has no guest email; never send confirmation to its placeholder.
      if (inquiry_type !== "guest_chat") {
      const confirmation = await resend.emails.send({
        from: "Royal Phuket City Hotel <noreply@royalphuketcity.com>",
        to: [email],
        replyTo: replyMailbox,
        subject: isEventInquiry 
          ? `Thank You for Your Event Inquiry - Royal Phuket City Hotel (Ref: ${referenceNumber})`
          : `Thank You for Contacting Us - Royal Phuket City Hotel (Ref: ${referenceNumber})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #8B7355; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">Royal Phuket City Hotel</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0;">Phuket Old Town, Thailand</p>
            </div>
            <div style="padding: 30px; background-color: #ffffff;">
              <h2 style="color: #8B7355; margin-top: 0;">Thank You, ${html.name}!</h2>
              <p style="color: #666; line-height: 1.6;">
                ${isEventInquiry 
                  ? "We have received your event inquiry and our dedicated Meetings & Events team will review your request."
                  : "We have received your message and a member of our team will get back to you shortly."
                }
              </p>
              <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border: 1px solid #eee;">
                <p style="margin: 0 0 10px 0; color: #333;"><strong>Your Reference Number:</strong></p>
                <p style="margin: 0; color: #8B7355; font-size: 24px; font-weight: bold;">${referenceNumber}</p>
                <p style="margin: 10px 0 0 0; color: #888; font-size: 12px;">Please quote this reference in any future correspondence.</p>
              </div>
              <h3 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Your Submission Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #333; font-weight: bold; width: 120px;">Name:</td><td style="padding: 8px 0; color: #666;">${html.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #333; font-weight: bold;">Email:</td><td style="padding: 8px 0; color: #666;">${html.email}</td></tr>
                <tr><td style="padding: 8px 0; color: #333; font-weight: bold;">Phone:</td><td style="padding: 8px 0; color: #666;">${html.phone || "Not provided"}</td></tr>
                ${subject ? `<tr><td style="padding: 8px 0; color: #333; font-weight: bold;">Subject:</td><td style="padding: 8px 0; color: #666;">${html.subject}</td></tr>` : ""}
              </table>
              <div style="background-color: #faf9f7; padding: 15px; border-left: 3px solid #8B7355; margin: 20px 0;">
                <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">${html.message}</p>
              </div>
              ${isEventInquiry ? `
              <div style="background-color: #8B7355; color: white; padding: 20px; margin: 20px 0; text-align: center;">
                <p style="margin: 0 0 10px 0; font-size: 14px;">Our events team typically responds within</p>
                <p style="margin: 0; font-size: 24px; font-weight: bold;">24-48 Business Hours</p>
              </div>
              ` : ""}
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
              <p style="color: #666; font-size: 14px; line-height: 1.6;">
                If you have any urgent inquiries, please contact us directly:
              </p>
              <p style="color: #666; font-size: 14px;">
                <strong>Phone:</strong> +66 76 233 355<br />
                <strong>Email:</strong> ${replyMailbox}
              </p>
            </div>
            <div style="background-color: #1a1a2e; padding: 20px; text-align: center;">
              <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 12px;">
                Royal Phuket City Hotel | 154 Phang Nga Road, Phuket Old Town 83000, Thailand
              </p>
              <p style="color: rgba(255,255,255,0.4); margin: 10px 0 0 0; font-size: 11px;">
                This is an automated confirmation. Please do not reply to this email.
              </p>
            </div>
          </div>
        `,
      });
      confirmationEmailSent = !confirmation.error;
      if (confirmation.error) console.error("Contact confirmation email:", confirmation.error);
      }
      } catch (error) {
        console.error("Contact email notification failed:", error);
      }
    }

    if (!submissionId && !staffEmailSent) {
      return NextResponse.json({ error: "Your inquiry could not be delivered. Please try again later or call +66 76 233 355." }, { status: 503 });
    }
    return NextResponse.json(
      { 
        success: true, 
        message: "Your inquiry has been submitted successfully.",
        referenceNumber,
        confirmationEmailSent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again later." },
      { status: 500 }
    );
  }
}
