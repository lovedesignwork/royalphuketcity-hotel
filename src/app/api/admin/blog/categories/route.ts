import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ categories: [] });
    }

    const { data, error } = await supabase
      .from("blog_categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching categories:", error);
      return NextResponse.json({ categories: [] });
    }

    return NextResponse.json({ categories: data || [] });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ categories: [] });
  }
}
