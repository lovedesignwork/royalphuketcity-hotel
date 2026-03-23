import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

function parseUserAgent(ua: string) {
  let device = "Desktop";
  let browser = "Unknown";

  if (/Mobile|Android|iPhone|iPad|iPod/i.test(ua)) {
    if (/iPad|Tablet/i.test(ua)) {
      device = "Tablet";
    } else {
      device = "Mobile";
    }
  }

  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) {
    browser = "Chrome";
  } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
    browser = "Safari";
  } else if (/Firefox/i.test(ua)) {
    browser = "Firefox";
  } else if (/Edg/i.test(ua)) {
    browser = "Edge";
  } else if (/MSIE|Trident/i.test(ua)) {
    browser = "IE";
  }

  return { device, browser };
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const body = await request.json();
    const { path, visitorId, referrer } = body;

    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "";

    const { device, browser } = parseUserAgent(userAgent);

    // Try to get country from IP (basic geolocation)
    let country = "Unknown";
    let city = null;

    if (ip && ip !== "unknown" && ip !== "127.0.0.1" && ip !== "::1") {
      try {
        const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=country,city`);
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          country = geoData.country || "Unknown";
          city = geoData.city || null;
        }
      } catch {
        // Ignore geo lookup errors
      }
    }

    const { error } = await supabase.from("page_views").insert({
      path,
      visitor_id: visitorId,
      ip_address: ip,
      user_agent: userAgent,
      device,
      browser,
      country,
      city,
      referrer: referrer || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error tracking page view:", error);
      return NextResponse.json({ error: "Failed to track" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in track API:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
