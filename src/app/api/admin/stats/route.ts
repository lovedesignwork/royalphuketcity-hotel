import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({
        totalPageViews: 0,
        uniqueVisitors: 0,
        todayPageViews: 0,
        todayUniqueVisitors: 0,
        weeklyPageViews: 0,
        monthlyPageViews: 0,
        topPages: [],
        recentVisitors: [],
        dailyStats: [],
      });
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString();

    // Total page views
    const { count: totalPageViews } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true });

    // Unique visitors (by visitor_id)
    const { data: uniqueVisitorData } = await supabase
      .from("page_views")
      .select("visitor_id")
      .not("visitor_id", "is", null);
    
    const uniqueVisitors = new Set(uniqueVisitorData?.map(v => v.visitor_id) || []).size;

    // Today's page views
    const { count: todayPageViews } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart);

    // Today's unique visitors
    const { data: todayUniqueData } = await supabase
      .from("page_views")
      .select("visitor_id")
      .gte("created_at", todayStart)
      .not("visitor_id", "is", null);
    
    const todayUniqueVisitors = new Set(todayUniqueData?.map(v => v.visitor_id) || []).size;

    // Weekly page views
    const { count: weeklyPageViews } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", weekAgo);

    // Monthly page views
    const { count: monthlyPageViews } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", monthAgo);

    // Top pages
    const { data: pageViewsData } = await supabase
      .from("page_views")
      .select("path")
      .gte("created_at", monthAgo);

    const pageCounts: Record<string, number> = {};
    pageViewsData?.forEach((pv) => {
      pageCounts[pv.path] = (pageCounts[pv.path] || 0) + 1;
    });

    const topPages = Object.entries(pageCounts)
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Recent visitors
    const { data: recentVisitorsData } = await supabase
      .from("page_views")
      .select("id, path, created_at, country, device")
      .order("created_at", { ascending: false })
      .limit(10);

    const recentVisitors = recentVisitorsData?.map((v) => ({
      id: v.id,
      path: v.path,
      timestamp: v.created_at,
      country: v.country,
      device: v.device,
    })) || [];

    // Daily stats for last 14 days
    const { data: dailyData } = await supabase
      .from("page_views")
      .select("created_at, visitor_id")
      .gte("created_at", twoWeeksAgo);

    const dailyStats: Record<string, { views: number; visitors: Set<string> }> = {};
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split("T")[0];
      dailyStats[dateStr] = { views: 0, visitors: new Set() };
    }

    dailyData?.forEach((pv) => {
      const dateStr = new Date(pv.created_at).toISOString().split("T")[0];
      if (dailyStats[dateStr]) {
        dailyStats[dateStr].views++;
        if (pv.visitor_id) {
          dailyStats[dateStr].visitors.add(pv.visitor_id);
        }
      }
    });

    const dailyStatsArray = Object.entries(dailyStats).map(([date, data]) => ({
      date,
      views: data.views,
      visitors: data.visitors.size,
    }));

    return NextResponse.json({
      totalPageViews: totalPageViews || 0,
      uniqueVisitors,
      todayPageViews: todayPageViews || 0,
      todayUniqueVisitors,
      weeklyPageViews: weeklyPageViews || 0,
      monthlyPageViews: monthlyPageViews || 0,
      topPages,
      recentVisitors,
      dailyStats: dailyStatsArray,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      {
        totalPageViews: 0,
        uniqueVisitors: 0,
        todayPageViews: 0,
        todayUniqueVisitors: 0,
        weeklyPageViews: 0,
        monthlyPageViews: 0,
        topPages: [],
        recentVisitors: [],
        dailyStats: [],
      },
      { status: 200 }
    );
  }
}
