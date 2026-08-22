import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { isAuthorizedCron } from "@/lib/seo/cron-auth";
import { buildMonthlyReport, renderMonthlyReportHtml } from "@/lib/seo/report";

// Monthly SEO report email. Scheduled for the 1st of each month (vercel.json).
// Emails the previous complete month vs the month before, via Resend.
//
// Recipient(s): SEO_REPORT_EMAIL (comma-separated allowed). Falls back to
// marketing@royalphuketcity.com so the report always has a home.

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const FALLBACK_RECIPIENT = "marketing@royalphuketcity.com";

export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const report = await buildMonthlyReport(supabase);

    if (!process.env.RESEND_API_KEY) {
      // No email provider — still return the computed report so a manual
      // trigger can inspect it.
      return NextResponse.json({
        success: true,
        emailed: false,
        reason: "RESEND_API_KEY not set",
        report,
      });
    }

    const recipients = (process.env.SEO_REPORT_EMAIL || FALLBACK_RECIPIENT)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Royal Phuket City SEO <noreply@royalphuketcity.com>",
      to: recipients,
      subject: `Monthly SEO Report — ${report.reportMonthLabel}`,
      html: renderMonthlyReportHtml(report),
    });

    return NextResponse.json({ success: true, emailed: true, recipients, reportMonth: report.reportMonthLabel });
  } catch (error) {
    console.error("Monthly SEO report failed:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Report failed" },
      { status: 500 }
    );
  }
}
