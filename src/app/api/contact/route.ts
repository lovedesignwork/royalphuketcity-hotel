import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, inquiry_type } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

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

      const { error: dbError } = await supabase.from("contact_submissions").insert([
        {
          name,
          email,
          phone: phone || null,
          subject: subject || null,
          message,
          inquiry_type: inquiry_type || "general",
          created_at: new Date().toISOString(),
        },
      ]);

      if (dbError) {
        console.error("Supabase error:", dbError);
      }
    }

    // Send email via Resend if API key is set
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Royal Phuket City <noreply@royalphuketcity.com>",
        to: ["reservation@royalphuketcity.com"],
        replyTo: email,
        subject: `Contact Form: ${subject || "New Inquiry"} - ${inquiry_type || "General"}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Inquiry Type:</strong> ${inquiry_type || "General"}</p>
          <p><strong>Subject:</strong> ${subject || "Not provided"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        `,
      });
    }

    return NextResponse.json(
      { success: true, message: "Your message has been sent successfully." },
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
