import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({
        totalPageViews: 0,
        uniqueVisitors: 0,
        allVisitors: [],
        pageStats: [],
        deviceStats: [],
        countryStats: [],
        hourlyStats: [],
      });
    }

    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "7d";

    const now = new Date();
    let startDate: Date;

    switch (range) {
      case "1d":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "30d":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Fetch all page views in range
    const { data: pageViews, count: totalPageViews } = await supabase
      .from("page_views")
      .select("*", { count: "exact" })
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: false });

    // Unique visitors
    const visitorIds = new Set(pageViews?.map((pv) => pv.visitor_id).filter(Boolean) || []);
    const uniqueVisitors = visitorIds.size;

    // All visitors (for table)
    const allVisitors = (pageViews || []).map((pv) => ({
      id: pv.id,
      path: pv.path,
      timestamp: pv.created_at,
      country: pv.country,
      city: pv.city,
      device: pv.device,
      browser: pv.browser,
      referrer: pv.referrer,
    }));

    // Page stats
    const pageStatsMap: Record<string, { views: number; visitors: Set<string> }> = {};
    pageViews?.forEach((pv) => {
      if (!pageStatsMap[pv.path]) {
        pageStatsMap[pv.path] = { views: 0, visitors: new Set() };
      }
      pageStatsMap[pv.path].views++;
      if (pv.visitor_id) {
        pageStatsMap[pv.path].visitors.add(pv.visitor_id);
      }
    });

    const pageStats = Object.entries(pageStatsMap)
      .map(([path, data]) => ({
        path,
        views: data.views,
        uniqueVisitors: data.visitors.size,
      }))
      .sort((a, b) => b.views - a.views);

    // Device stats
    const deviceMap: Record<string, number> = {};
    pageViews?.forEach((pv) => {
      const device = pv.device || "Unknown";
      deviceMap[device] = (deviceMap[device] || 0) + 1;
    });

    const deviceStats = Object.entries(deviceMap)
      .map(([device, count]) => ({ device, count }))
      .sort((a, b) => b.count - a.count);

    // Country stats
    const countryMap: Record<string, number> = {};
    pageViews?.forEach((pv) => {
      const country = pv.country || "Unknown";
      countryMap[country] = (countryMap[country] || 0) + 1;
    });

    const countryStats = Object.entries(countryMap)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count);

    // Hourly stats
    const hourlyMap: Record<number, number> = {};
    for (let i = 0; i < 24; i++) {
      hourlyMap[i] = 0;
    }
    pageViews?.forEach((pv) => {
      const hour = new Date(pv.created_at).getHours();
      hourlyMap[hour]++;
    });

    const hourlyStats = Object.entries(hourlyMap).map(([hour, views]) => ({
      hour: parseInt(hour),
      views,
    }));

    return NextResponse.json({
      totalPageViews: totalPageViews || 0,
      uniqueVisitors,
      allVisitors,
      pageStats,
      deviceStats,
      countryStats,
      hourlyStats,
    });
  } catch (error) {
    console.error("Error fetching detailed stats:", error);
    return NextResponse.json(
      {
        totalPageViews: 0,
        uniqueVisitors: 0,
        allVisitors: [],
        pageStats: [],
        deviceStats: [],
        countryStats: [],
        hourlyStats: [],
      },
      { status: 200 }
    );
  }
}
