"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [gaId, setGaId] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentGaId, setCurrentGaId] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setGaId(data.googleAnalyticsId || "");
        setCurrentGaId(data.googleAnalyticsId || "");
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googleAnalyticsId: gaId }),
      });
      if (res.ok) {
        setSaved(true);
        setCurrentGaId(gaId);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">
          Configure your analytics and tracking settings
        </p>
      </div>

      {/* Google Analytics Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.84 2.998v18.004c0 1.656-1.344 3-3 3H4.16c-1.656 0-3-1.344-3-3V2.998c0-1.656 1.344-3 3-3h15.68c1.656 0 3 1.344 3 3zM20.84 21V3c0-.551-.449-1-1-1H4.16c-.551 0-1 .449-1 1v18c0 .551.449 1 1 1h15.68c.551 0 1-.449 1-1z" />
              <path d="M8.84 13v5h-3v-5h3zm5-4v9h-3V9h3zm5-4v13h-3V5h3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Google Analytics 4
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Connect your Google Analytics account to track website visitors
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="ga-id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Measurement ID
            </label>
            <input
              type="text"
              id="ga-id"
              value={gaId}
              onChange={(e) => setGaId(e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">
              You can find this in Google Analytics under Admin → Data Streams → Web
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving || gaId === currentGaId}
              className="px-6 py-2.5 bg-[#8B7355] text-white rounded-lg hover:bg-[#6d5a43] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            {saved && (
              <span className="text-green-600 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Saved successfully
              </span>
            )}
          </div>
        </div>

        {currentGaId && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-600">
                Currently tracking with: <code className="bg-gray-100 px-2 py-0.5 rounded">{currentGaId}</code>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Setup Instructions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Setup Instructions
        </h2>
        <ol className="space-y-4 text-sm text-gray-600">
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-[#8B7355] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
              1
            </span>
            <div>
              <p className="font-medium text-gray-900">Create a Google Analytics 4 Property</p>
              <p className="mt-1">
                Go to{" "}
                <a
                  href="https://analytics.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B7355] hover:underline"
                >
                  analytics.google.com
                </a>{" "}
                and create a new GA4 property for your website.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-[#8B7355] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
              2
            </span>
            <div>
              <p className="font-medium text-gray-900">Get Your Measurement ID</p>
              <p className="mt-1">
                In GA4, go to Admin → Data Streams → Select your web stream → Copy the Measurement ID (starts with G-).
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-[#8B7355] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
              3
            </span>
            <div>
              <p className="font-medium text-gray-900">Enter the ID Above</p>
              <p className="mt-1">
                Paste your Measurement ID in the field above and click Save. The tracking code will be automatically added to all pages.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-[#8B7355] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
              4
            </span>
            <div>
              <p className="font-medium text-gray-900">Verify Installation</p>
              <p className="mt-1">
                Use Google Analytics Real-Time reports or the{" "}
                <a
                  href="https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B7355] hover:underline"
                >
                  Tag Assistant
                </a>{" "}
                Chrome extension to verify tracking is working.
              </p>
            </div>
          </li>
        </ol>
      </div>

      {/* Built-in Analytics Info */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-medium text-blue-900">Built-in Analytics</h3>
            <p className="text-sm text-blue-700 mt-1">
              This dashboard also tracks page views using our built-in system. You&apos;ll see visitor counts on the Dashboard page even without Google Analytics connected. Google Analytics provides additional features like demographics, traffic sources, and user behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
