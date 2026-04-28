import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET_NAME = "downloads";

// GET - Fetch all download files
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("download_files")
      .select("*")
      .order("uploaded_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
    }

    return NextResponse.json({ files: data || [] });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Upload a new file
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const documentType = formData.get("document_type") as string;
    const languageCode = formData.get("language_code") as string;

    if (!file || !documentType || !languageCode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less than 50MB" },
        { status: 400 }
      );
    }

    // Check if file already exists for this document type and language
    const { data: existingFile } = await supabase
      .from("download_files")
      .select("*")
      .eq("document_type", documentType)
      .eq("language_code", languageCode)
      .single();

    // If existing file, delete it from storage first
    if (existingFile) {
      const oldPath = existingFile.storage_path;
      await supabase.storage.from(BUCKET_NAME).remove([oldPath]);
      await supabase.from("download_files").delete().eq("id", existingFile.id);
    }

    // Generate storage path
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const storagePath = `${documentType}/${languageCode}/${timestamp}-${sanitizedFileName}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, buffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file to storage" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath);

    // Get language label
    const languageLabels: Record<string, string> = {
      en: "English",
      th: "Thai",
      ru: "Russian",
      zh: "Chinese",
      ko: "Korean",
      vi: "Vietnamese",
    };

    // Save to database
    const { data: newFile, error: dbError } = await supabase
      .from("download_files")
      .insert({
        document_type: documentType,
        language_code: languageCode,
        language_label: languageLabels[languageCode] || languageCode,
        file_url: urlData.publicUrl,
        file_name: file.name,
        file_size: file.size,
        storage_path: storagePath,
        uploaded_by: "admin",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      // Try to clean up uploaded file
      await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
      return NextResponse.json(
        { error: "Failed to save file record" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, file: newFile });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE - Delete a file
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "File ID required" }, { status: 400 });
    }

    // Get file record
    const { data: file, error: fetchError } = await supabase
      .from("download_files")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([file.storage_path]);

    if (storageError) {
      console.error("Storage delete error:", storageError);
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from("download_files")
      .delete()
      .eq("id", id);

    if (dbError) {
      console.error("Database delete error:", dbError);
      return NextResponse.json(
        { error: "Failed to delete file record" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
