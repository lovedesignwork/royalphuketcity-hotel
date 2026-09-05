import { NextRequest, NextResponse } from "next/server";
import { validateAntiSpam } from "@/lib/antispam";
import { EMAIL_ASSIGNMENTS } from "@/lib/email-routing";

const ROOMS_ASSIGNMENT = EMAIL_ASSIGNMENTS.feedback;

const RATINGS = ["overall", "room", "cleanliness", "staff", "dining"] as const;
const STAY_AGAIN = ["yes", "maybe", "no"] as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function score(value: unknown): number | null {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > 5) return null;
  return n;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const overall = score(body.overall);
    const room = body.room ? score(body.room) : null;
    const cleanliness = body.cleanliness ? score(body.cleanliness) : null;
    const staff = body.staff ? score(body.staff) : null;
    const dining = body.dining ? score(body.dining) : null;
    const stayAgain = STAY_AGAIN.includes(body.stayAgain) ? body.stayAgain : null;
    const comments = typeof body.comments === "string" ? body.comments.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const roomNumber = typeof body.roomNumber === "string" ? body.roomNumber.trim() : "";

    const spamCheck = await validateAntiSpam({
      honeypot: body._hp,
      formLoadedAt: body._ts,
      message: comments || "stay survey",
      email: email || "guest@royalphuketcity.com",
      name: name || "Hotel guest",
    });

    if (!spamCheck.passed) {
      return NextResponse.json(
        { success: false, error: spamCheck.reason || "Your submission was blocked" },
        { status: 400 }
      );
    }

    if (!overall) {
      return NextResponse.json(
        { success: false, error: "Please rate your overall stay" },
        { status: 400 }
      );
    }

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      return NextResponse.json(
        { success: false, error: "Feedback is not configured" },
        { status: 500 }
      );
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from("guest_feedback")
      .insert({
        guest_name: name || null,
        email: email || null,
        room_number: roomNumber || null,
        overall,
        room,
        cleanliness,
        staff,
        dining,
        stay_again: stayAgain,
        comments: comments || null,
        source: "guest_app",
        status: "new",
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error("guest_feedback insert:", error);
      return NextResponse.json(
        { success: false, error: "Could not save your feedback" },
        { status: 500 }
      );
    }

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const rows = RATINGS.map((key) => {
        const value = { overall, room, cleanliness, staff, dining }[key];
        return `<tr><td style="padding:6px 0;text-transform:capitalize">${key}</td><td>${value ?? "-"} / 5</td></tr>`;
      }).join("");

      await resend.emails.send({
        from: "Royal Phuket City <noreply@royalphuketcity.com>",
        to: [...ROOMS_ASSIGNMENT.to],
        cc: [...ROOMS_ASSIGNMENT.cc],
        replyTo: email || undefined,
        subject: `Guest stay feedback: ${overall}/5${roomNumber ? ` · Room ${roomNumber}` : ""}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#8B7355;padding:20px;text-align:center">
              <h1 style="color:#fff;margin:0">Stay feedback</h1>
            </div>
            <div style="padding:24px;background:#f9f9f9">
              <p><strong>Name:</strong> ${escapeHtml(name) || "Not given"}</p>
              <p><strong>Email:</strong> ${escapeHtml(email) || "Not given"}</p>
              <p><strong>Room:</strong> ${escapeHtml(roomNumber) || "Not given"}</p>
              <table style="width:100%;margin:16px 0">${rows}</table>
              <p><strong>Would stay again:</strong> ${stayAgain || "Not given"}</p>
              <p><strong>Comments:</strong><br>${escapeHtml(comments || "None").replace(/\n/g, "<br>")}</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error("feedback:", error);
    return NextResponse.json(
      { success: false, error: "Could not save your feedback" },
      { status: 500 }
    );
  }
}
