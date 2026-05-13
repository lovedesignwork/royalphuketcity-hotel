import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET_NAME = "downloads";

const languageLabels: Record<string, string> = {
  en: "English",
  th: "Thai",
  ru: "Russian",
  zh: "Chinese",
  ko: "Korean",
  vi: "Vietnamese",
};

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

// POST - Handle upload operations (signed URL, confirm, or direct upload)
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    
    // JSON request - signed URL or confirm upload
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const { action } = body;
      
      if (action === "get-signed-url") {
        return handleGetSignedUrl(body);
      } else if (action === "confirm-upload") {
        return handleConfirmUpload(body);
      } else {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
      }
    }
    
    // FormData request - legacy direct upload (for small files)
    return handleDirectUpload(request);
  } catch (error) {
    console.error("Error in POST handler:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Server error: ${errorMessage}` }, { status: 500 });
  }
}

// Get a signed URL for direct browser upload to Supabase Storage
async function handleGetSignedUrl(body: {
  document_type: string;
  language_code: string;
  file_name: string;
  file_size: number;
}) {
  const { document_type, language_code, file_name, file_size } = body;

  if (!document_type || !language_code || !file_name || !file_size) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Validate file size (30MB max)
  const maxSize = 30 * 1024 * 1024;
  if (file_size > maxSize) {
    return NextResponse.json({ error: "File size must be less than 30MB" }, { status: 400 });
  }

  // Check if file already exists for this document type and language
  const { data: existingFile } = await supabase
    .from("download_files")
    .select("*")
    .eq("document_type", document_type)
    .eq("language_code", language_code)
    .single();

  // If existing file, delete it from storage first
  if (existingFile) {
    await supabase.storage.from(BUCKET_NAME).remove([existingFile.storage_path]);
    await supabase.from("download_files").delete().eq("id", existingFile.id);
  }

  // Generate storage path
  const timestamp = Date.now();
  const sanitizedFileName = file_name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const storagePath = `${document_type}/${language_code}/${timestamp}-${sanitizedFileName}`;

  // Create signed upload URL (valid for 5 minutes)
  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUploadUrl(storagePath);

  if (signedUrlError) {
    console.error("Signed URL error:", signedUrlError);
    return NextResponse.json({ error: `Failed to create upload URL: ${signedUrlError.message}` }, { status: 500 });
  }

  return NextResponse.json({
    signedUrl: signedUrlData.signedUrl,
    token: signedUrlData.token,
    path: signedUrlData.path,
    storagePath,
  });
}

// Confirm upload and save metadata to database
async function handleConfirmUpload(body: {
  storage_path: string;
  document_type: string;
  language_code: string;
  file_name: string;
  file_size: number;
}) {
  const { storage_path, document_type, language_code, file_name, file_size } = body;

  if (!storage_path || !document_type || !language_code || !file_name || !file_size) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Verify the file exists in storage
  const { data: fileData, error: checkError } = await supabase.storage
    .from(BUCKET_NAME)
    .list(storage_path.split("/").slice(0, -1).join("/"), {
      search: storage_path.split("/").pop(),
    });

  if (checkError || !fileData || fileData.length === 0) {
    console.error("File verification failed:", checkError);
    return NextResponse.json({ error: "Upload verification failed - file not found in storage" }, { status: 400 });
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(storage_path);

  // Save to database
  const { data: newFile, error: dbError } = await supabase
    .from("download_files")
    .insert({
      document_type,
      language_code,
      language_label: languageLabels[language_code] || language_code,
      file_url: urlData.publicUrl,
      file_name,
      file_size,
      storage_path,
      uploaded_by: "admin",
    })
    .select()
    .single();

  if (dbError) {
    console.error("Database error:", dbError);
    // Clean up uploaded file on DB failure
    await supabase.storage.from(BUCKET_NAME).remove([storage_path]);
    return NextResponse.json({ error: "Failed to save file record" }, { status: 500 });
  }

  return NextResponse.json({ success: true, file: newFile });
}

// Legacy direct upload handler (for small files or fallback)
async function handleDirectUpload(request: NextRequest) {
  console.log("Direct upload request received");
  
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const documentType = formData.get("document_type") as string;
  const languageCode = formData.get("language_code") as string;

  console.log("Form data parsed:", { 
    hasFile: !!file, 
    fileName: file?.name,
    fileSize: file?.size,
    fileType: file?.type,
    documentType, 
    languageCode 
  });

  if (!file || !documentType || !languageCode) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
  }

  const maxSize = 30 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json({ error: "File size must be less than 30MB" }, { status: 400 });
  }

  // Check if file already exists
  const { data: existingFile } = await supabase
    .from("download_files")
    .select("*")
    .eq("document_type", documentType)
    .eq("language_code", languageCode)
    .single();

  if (existingFile) {
    await supabase.storage.from(BUCKET_NAME).remove([existingFile.storage_path]);
    await supabase.from("download_files").delete().eq("id", existingFile.id);
  }

  const timestamp = Date.now();
  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const storagePath = `${documentType}/${languageCode}/${timestamp}-${sanitizedFileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, uint8Array, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadError) {
    console.error("Storage upload error:", uploadError);
    return NextResponse.json({ error: `Storage error: ${uploadError.message}` }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);

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
    await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
    return NextResponse.json({ error: "Failed to save file record" }, { status: 500 });
  }

  return NextResponse.json({ success: true, file: newFile });
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
