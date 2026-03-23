import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// GET - Fetch all public download files (organized by document type)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("download_files")
      .select("id, document_type, language_code, language_label, file_url, file_name, file_size")
      .order("document_type")
      .order("language_code");

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
    }

    // Organize files by document type
    const documents: Record<string, {
      id: string;
      title: string;
      description: string;
      icon: string;
      languages: Array<{
        code: string;
        label: string;
        fileUrl: string;
        fileName: string;
        fileSize: number;
      }>;
    }> = {
      "company-presentation": {
        id: "company-presentation",
        title: "Company Presentation",
        description: "Complete overview of Royal Phuket City Hotel",
        icon: "building",
        languages: [],
      },
      "hotel-presentation": {
        id: "hotel-presentation",
        title: "Hotel Presentation",
        description: "Rooms, facilities, dining, and amenities",
        icon: "hotel",
        languages: [],
      },
      "mice-presentation": {
        id: "mice-presentation",
        title: "MICE Presentation",
        description: "Meeting rooms, event spaces, and packages",
        icon: "presentation",
        languages: [],
      },
      "fact-sheet": {
        id: "fact-sheet",
        title: "Fact Sheet",
        description: "Quick reference guide with key facts",
        icon: "document",
        languages: [],
      },
    };

    // Populate languages for each document type
    if (data) {
      for (const file of data) {
        if (documents[file.document_type]) {
          documents[file.document_type].languages.push({
            code: file.language_code,
            label: file.language_label,
            fileUrl: file.file_url,
            fileName: file.file_name,
            fileSize: file.file_size,
          });
        }
      }
    }

    // Convert to array and filter out empty documents
    const documentsArray = Object.values(documents).filter(
      (doc) => doc.languages.length > 0
    );

    return NextResponse.json({ documents: documentsArray });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
