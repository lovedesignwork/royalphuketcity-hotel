import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { buildMonthlyReport, renderMonthlyReportHtml } from "@/lib/seo/report";

// On-demand monthly report from the dashboard. Auth via middleware.
//   GET            -> returns the computed report JSON (preview)
//   POST {send:true}-> also emails it via Resend to SEO_REPORT_EMAIL

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const FALLBACK_RECIPIENT = "marketing@royalphuketcity.com";

export async function GET() {
  const supabase = getSupabaseClient();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  try {
    const report = await buildMonthlyReport(supabase);
    return NextResponse.json({ report });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Report failed" },
      { status: 500 }
    );
  }
}

export async function POST() {
  const supabase = getSupabaseClient();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  try {
    const report = await buildMonthlyReport(supabase);

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, error: "RESEND_API_KEY not set" },
        { status: 400 }
      );
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

    return NextResponse.json({ success: true, recipients, reportMonth: report.reportMonthLabel });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Report failed" },
      { status: 500 }
    );
  }
}
