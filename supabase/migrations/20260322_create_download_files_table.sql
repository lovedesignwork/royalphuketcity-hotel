-- Create download_files table for managing downloadable documents
CREATE TABLE IF NOT EXISTS download_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_type VARCHAR(50) NOT NULL,
    language_code VARCHAR(10) NOT NULL,
    language_label VARCHAR(50) NOT NULL,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INTEGER NOT NULL DEFAULT 0,
    storage_path TEXT NOT NULL,
    uploaded_by VARCHAR(100) DEFAULT 'admin',
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique combination of document type and language
    UNIQUE(document_type, language_code)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_download_files_document_type ON download_files(document_type);
CREATE INDEX IF NOT EXISTS idx_download_files_language_code ON download_files(language_code);

-- Add RLS policies
ALTER TABLE download_files ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for the public download page)
CREATE POLICY "Allow public read access on download_files"
    ON download_files
    FOR SELECT
    TO anon
    USING (true);

-- Allow authenticated users to manage files (admin operations)
CREATE POLICY "Allow authenticated users to manage download_files"
    ON download_files
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow service role full access (for API operations)
CREATE POLICY "Allow service role full access on download_files"
    ON download_files
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Create the storage bucket for downloads (if not exists)
-- Note: This needs to be run separately or via Supabase Dashboard
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('downloads', 'downloads', true)
-- ON CONFLICT (id) DO NOTHING;

COMMENT ON TABLE download_files IS 'Stores metadata for downloadable PDF documents (presentations, fact sheets)';
COMMENT ON COLUMN download_files.document_type IS 'Type of document: company-presentation, hotel-presentation, mice-presentation, fact-sheet';
COMMENT ON COLUMN download_files.language_code IS 'Language code: en, ru, zh, ko, vi';
COMMENT ON COLUMN download_files.storage_path IS 'Path to file in Supabase Storage bucket';
