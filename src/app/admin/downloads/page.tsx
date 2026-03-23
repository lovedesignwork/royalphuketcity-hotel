"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface DocumentFile {
  id: string;
  document_type: string;
  language_code: string;
  language_label: string;
  file_url: string;
  file_name: string;
  file_size: number;
  uploaded_at: string;
  uploaded_by: string;
}

interface DocumentType {
  id: string;
  title: string;
  description: string;
}

const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: "company-presentation",
    title: "Company Presentation",
    description: "Complete overview of Royal Phuket City Hotel",
  },
  {
    id: "hotel-presentation",
    title: "Hotel Presentation",
    description: "Rooms, facilities, dining, and amenities",
  },
  {
    id: "mice-presentation",
    title: "MICE Presentation",
    description: "Meeting rooms, event spaces, and packages",
  },
  {
    id: "fact-sheet",
    title: "Fact Sheet",
    description: "Quick reference guide with key facts",
  },
];

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru", label: "Russian", flag: "🇷🇺" },
  { code: "zh", label: "Chinese", flag: "🇨🇳" },
  { code: "ko", label: "Korean", flag: "🇰🇷" },
  { code: "vi", label: "Vietnamese", flag: "🇻🇳" },
];

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDownloadsPage() {
  const [files, setFiles] = useState<DocumentFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchFiles = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/downloads");
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      }
    } catch (err) {
      console.error("Failed to fetch files:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUpload = async (
    documentType: string,
    languageCode: string,
    file: File
  ) => {
    const key = `${documentType}-${languageCode}`;
    setUploadingFor(key);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", documentType);
    formData.append("language_code", languageCode);

    try {
      const response = await fetch("/api/admin/downloads", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccess(`Successfully uploaded ${file.name}`);
        fetchFiles();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to upload file");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload file");
    } finally {
      setUploadingFor(null);
    }
  };

  const handleDelete = async (fileId: string, fileName: string) => {
    if (!confirm(`Are you sure you want to delete "${fileName}"?`)) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/admin/downloads?id=${fileId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSuccess(`Successfully deleted ${fileName}`);
        fetchFiles();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete file");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete file");
    }
  };

  const getFileForSlot = (documentType: string, languageCode: string) => {
    return files.find(
      (f) => f.document_type === documentType && f.language_code === languageCode
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                Download Center Management
              </h1>
            </div>
            <Link
              href="/download-fact-sheets"
              target="_blank"
              className="text-sm text-[#8B7355] hover:underline flex items-center gap-1"
            >
              View Public Page
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError("")} className="text-red-500 hover:text-red-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center justify-between">
            <span>{success}</span>
            <button onClick={() => setSuccess("")} className="text-green-500 hover:text-green-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="font-medium text-blue-900 mb-2">How to manage documents</h2>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Click on any cell to upload a PDF file for that document and language</li>
            <li>• Uploading a new file will automatically replace the existing one</li>
            <li>• Only PDF files are accepted (max 50MB)</li>
            <li>• Not all languages need to have files - empty cells are fine</li>
          </ul>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Total Documents</p>
            <p className="text-2xl font-semibold text-gray-900">{files.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Document Types</p>
            <p className="text-2xl font-semibold text-gray-900">{DOCUMENT_TYPES.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Languages</p>
            <p className="text-2xl font-semibold text-gray-900">{LANGUAGES.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Total Size</p>
            <p className="text-2xl font-semibold text-gray-900">
              {formatFileSize(files.reduce((acc, f) => acc + f.file_size, 0))}
            </p>
          </div>
        </div>

        {/* Documents Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B7355]"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-6 bg-gray-50 border-b border-gray-200">
              <div className="p-4 font-medium text-gray-700">Document Type</div>
              {LANGUAGES.map((lang) => (
                <div key={lang.code} className="p-4 font-medium text-gray-700 text-center">
                  <span className="text-lg mr-1">{lang.flag}</span>
                  {lang.label}
                </div>
              ))}
            </div>

            {/* Table Body */}
            {DOCUMENT_TYPES.map((docType) => (
              <div key={docType.id} className="grid grid-cols-6 border-b border-gray-100 last:border-b-0">
                {/* Document Type Info */}
                <div className="p-4 bg-gray-50">
                  <p className="font-medium text-gray-900">{docType.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{docType.description}</p>
                </div>

                {/* Language Columns */}
                {LANGUAGES.map((lang) => {
                  const file = getFileForSlot(docType.id, lang.code);
                  const key = `${docType.id}-${lang.code}`;
                  const isUploading = uploadingFor === key;

                  return (
                    <div
                      key={lang.code}
                      className="p-4 border-l border-gray-100 relative group"
                    >
                      {file ? (
                        // File exists
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 13H10v4H8.5v-1.5H7V17H5.5v-4H7v1.5h1.5V13zm3.5 2.5c0 .83.67 1.5 1.5 1.5h2v-1.5h-2v-1h2V13h-2c-.83 0-1.5.67-1.5 1.5v2z"/>
                            </svg>
                            <span className="text-xs text-gray-600 truncate" title={file.file_name}>
                              {file.file_name.length > 15 
                                ? file.file_name.substring(0, 15) + "..." 
                                : file.file_name}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">
                            {formatFileSize(file.file_size)}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(file.uploaded_at)}
                          </p>
                          
                          {/* Actions */}
                          <div className="flex gap-2 pt-2">
                            <a
                              href={file.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline"
                            >
                              View
                            </a>
                            <label className="text-xs text-[#8B7355] hover:underline cursor-pointer">
                              Replace
                              <input
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) handleUpload(docType.id, lang.code, f);
                                }}
                              />
                            </label>
                            <button
                              onClick={() => handleDelete(file.id, file.file_name)}
                              className="text-xs text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Empty slot
                        <label className={`
                          flex flex-col items-center justify-center h-full min-h-[100px] 
                          border-2 border-dashed border-gray-200 rounded-lg cursor-pointer
                          hover:border-[#8B7355] hover:bg-[#8B7355]/5 transition-colors
                          ${isUploading ? "opacity-50 cursor-wait" : ""}
                        `}>
                          {isUploading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#8B7355]"></div>
                          ) : (
                            <>
                              <svg className="w-6 h-6 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                              <span className="text-xs text-gray-400">Upload PDF</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            disabled={isUploading}
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleUpload(docType.id, lang.code, f);
                            }}
                          />
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* Recent Uploads */}
        {files.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Uploads</h2>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">File</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Language</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {files
                    .sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime())
                    .slice(0, 10)
                    .map((file) => {
                      const docType = DOCUMENT_TYPES.find((d) => d.id === file.document_type);
                      const lang = LANGUAGES.find((l) => l.code === file.language_code);
                      return (
                        <tr key={file.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <a
                              href={file.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline flex items-center gap-2"
                            >
                              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
                              </svg>
                              {file.file_name}
                            </a>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {docType?.title || file.document_type}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            <span className="mr-1">{lang?.flag}</span>
                            {lang?.label || file.language_code}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {formatFileSize(file.file_size)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {formatDate(file.uploaded_at)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
