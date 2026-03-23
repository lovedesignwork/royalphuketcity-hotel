import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.log("Supabase client not available");
      return NextResponse.json({ announcements: [] });
    }

    // First, get all active announcements
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching active announcement:", error);
      return NextResponse.json({ announcements: [] });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ announcements: [] });
    }

    // Filter by date in JavaScript (simpler than complex Supabase queries)
    const now = new Date();
    const validAnnouncements = data.filter((announcement) => {
      const startDate = announcement.start_date ? new Date(announcement.start_date) : null;
      const endDate = announcement.end_date ? new Date(announcement.end_date) : null;

      // Check start date (if set, must be in the past or now)
      if (startDate && startDate > now) {
        return false;
      }

      // Check end date (if set, must be in the future or now)
      if (endDate && endDate < now) {
        return false;
      }

      return true;
    });

    // Return only the first valid announcement
    return NextResponse.json({ 
      announcements: validAnnouncements.slice(0, 1) 
    });
  } catch (error) {
    console.error("Error in announcements API:", error);
    return NextResponse.json({ announcements: [] });
  }
}
