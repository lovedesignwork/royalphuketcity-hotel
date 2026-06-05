"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface DownloadsStats {
  totalViews: number;
  uniqueVisitors: number;
  countryStats: { country: string; count: number }[];
  deviceStats: { device: string; count: number }[];
  browserStats: { browser: string; count: number }[];
  referrerStats: { referrer: string; count: number }[];
  dailyStats: { date: string; count: number }[];
  recentVisitors: {
    id: string;
    timestamp: string;
    country?: string;
    city?: string;
    device?: string;
    browser?: string;
    referrer?: string;
  }[];
}

interface DetailedStats {
  totalPageViews: number;
  uniqueVisitors: number;
  allVisitors: {
    id: string;
    path: string;
    timestamp: string;
    country?: string;
    city?: string;
    device?: string;
    browser?: string;
    referrer?: string;
  }[];
  pageStats: { path: string; views: number; uniqueVisitors: number }[];
  deviceStats: { device: string; count: number }[];
  countryStats: { country: string; count: number }[];
  hourlyStats: { hour: number; views: number }[];
  downloadsStats: DownloadsStats | null;
}

const countryCodeMap: Record<string, string> = {
  "Thailand": "th",
  "United States": "us",
  "China": "cn",
  "Japan": "jp",
  "South Korea": "kr",
  "Russia": "ru",
  "Germany": "de",
  "France": "fr",
  "United Kingdom": "gb",
  "Australia": "au",
  "Singapore": "sg",
  "Malaysia": "my",
  "India": "in",
  "Indonesia": "id",
  "Vietnam": "vn",
  "Philippines": "ph",
  "Hong Kong": "hk",
  "Taiwan": "tw",
  "Canada": "ca",
  "Netherlands": "nl",
  "Sweden": "se",
  "Italy": "it",
  "Spain": "es",
  "Brazil": "br",
  "Mexico": "mx",
  "UAE": "ae",
  "Saudi Arabia": "sa",
  "Israel": "il",
  "New Zealand": "nz",
  "Switzerland": "ch",
  "Austria": "at",
  "Belgium": "be",
  "Denmark": "dk",
  "Norway": "no",
  "Finland": "fi",
  "Poland": "pl",
  "Czech Republic": "cz",
  "Ireland": "ie",
  "Portugal": "pt",
  "Greece": "gr",
  "Turkey": "tr",
  "South Africa": "za",
  "Argentina": "ar",
  "Chile": "cl",
  "Colombia": "co",
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState<DetailedStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("7d");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  async function fetchStats() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/stats/detailed?range=${dateRange}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  }

  const paginatedVisitors = stats?.allVisitors?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || [];

  const totalPages = Math.ceil((stats?.allVisitors?.length || 0) / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-[#8B7355] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Detailed visitor statistics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
          >
            <option value="1d">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button
            onClick={fetchStats}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Page Views</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {stats?.totalPageViews?.toLocaleString() || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Unique Visitors</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {stats?.uniqueVisitors?.toLocaleString() || 0}
          </p>
        </div>
      </div>

      {/* Downloads Analytics Section */}
      {stats?.downloadsStats && (
        <div className="bg-gradient-to-br from-[#8B7355]/5 to-[#8B7355]/10 rounded-xl border border-[#8B7355]/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#8B7355] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Downloads Page Analytics</h2>
              <p className="text-sm text-gray-500">/download-fact-sheets visitor insights</p>
            </div>
          </div>

          {/* Downloads Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Page Views</p>
              <p className="text-2xl font-bold text-[#8B7355] mt-1">
                {stats.downloadsStats.totalViews.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Unique Visitors</p>
              <p className="text-2xl font-bold text-[#8B7355] mt-1">
                {stats.downloadsStats.uniqueVisitors.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Countries</p>
              <p className="text-2xl font-bold text-[#8B7355] mt-1">
                {stats.downloadsStats.countryStats.length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Conversion Rate</p>
              <p className="text-2xl font-bold text-[#8B7355] mt-1">
                {stats.totalPageViews > 0
                  ? ((stats.downloadsStats.totalViews / stats.totalPageViews) * 100).toFixed(1)
                  : 0}%
              </p>
            </div>
          </div>

          {/* Downloads Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Countries */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Visitors by Country
              </h3>
              {stats.downloadsStats.countryStats.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {stats.downloadsStats.countryStats.map((country, index) => {
                    const countryCode = countryCodeMap[country.country];
                    return (
                      <div key={index} className="flex items-center justify-between py-1">
                        <span className="text-sm text-gray-700 flex items-center gap-2">
                          {countryCode ? (
                            <Image
                              src={`https://flagcdn.com/w20/${countryCode}.png`}
                              alt={country.country}
                              width={20}
                              height={15}
                              className="rounded-sm"
                            />
                          ) : (
                            <span className="w-5 h-4 bg-gray-200 rounded-sm flex items-center justify-center text-[10px]">
                              {country.country === "Local" ? "🏠" : "?"}
                            </span>
                          )}
                          {country.country === "Local" ? "Local (Dev)" : country.country}
                        </span>
                        <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                          {country.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No data available</p>
              )}
            </div>

            {/* Traffic Sources */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Traffic Sources
              </h3>
              {stats.downloadsStats.referrerStats.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {stats.downloadsStats.referrerStats.slice(0, 8).map((ref, index) => (
                    <div key={index} className="flex items-center justify-between py-1">
                      <span className="text-sm text-gray-700 truncate max-w-[180px]" title={ref.referrer}>
                        {ref.referrer === "Direct" ? "Direct / Bookmarked" : ref.referrer}
                      </span>
                      <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                        {ref.count}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No data available</p>
              )}
            </div>

            {/* Devices */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Devices
              </h3>
              {stats.downloadsStats.deviceStats.length > 0 ? (
                <div className="space-y-2">
                  {stats.downloadsStats.deviceStats.map((device, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#8B7355]/10 flex items-center justify-center">
                        {device.device === "Mobile" ? (
                          <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        ) : device.device === "Tablet" ? (
                          <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{device.device}</span>
                          <span className="text-sm font-medium text-gray-900">{device.count}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-[#8B7355] h-1.5 rounded-full"
                            style={{
                              width: `${(device.count / (stats.downloadsStats?.totalViews || 1)) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No data available</p>
              )}
            </div>

            {/* Browsers */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Browsers
              </h3>
              {stats.downloadsStats.browserStats.length > 0 ? (
                <div className="space-y-2">
                  {stats.downloadsStats.browserStats.slice(0, 5).map((browser, index) => (
                    <div key={index} className="flex items-center justify-between py-1">
                      <span className="text-sm text-gray-700">{browser.browser}</span>
                      <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                        {browser.count}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No data available</p>
              )}
            </div>
          </div>

          {/* Daily Trend Chart */}
          {stats.downloadsStats.dailyStats.length > 1 && (
            <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Daily Downloads Page Views
              </h3>
              <div className="flex items-end gap-1 h-24">
                {stats.downloadsStats.dailyStats.map((day, index) => {
                  const maxViews = Math.max(...stats.downloadsStats!.dailyStats.map((d) => d.count), 1);
                  return (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-full bg-[#8B7355] rounded-t transition-all hover:bg-[#6d5a43]"
                        style={{
                          height: `${(day.count / maxViews) * 100}%`,
                          minHeight: day.count > 0 ? "4px" : "0",
                        }}
                        title={`${day.date}: ${day.count} views`}
                      />
                      {index % Math.ceil(stats.downloadsStats!.dailyStats.length / 7) === 0 && (
                        <span className="text-[9px] text-gray-400 -rotate-45 origin-top-left">
                          {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Downloads Visitors */}
          {stats.downloadsStats.recentVisitors.length > 0 && (
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recent Visitors to Downloads Page
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      <th className="pb-2 pr-3">Time</th>
                      <th className="pb-2 pr-3">Country</th>
                      <th className="pb-2 pr-3">City</th>
                      <th className="pb-2 pr-3">Device</th>
                      <th className="pb-2 pr-3">Browser</th>
                      <th className="pb-2">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {stats.downloadsStats.recentVisitors.slice(0, 10).map((visitor) => {
                      const countryCode = visitor.country ? countryCodeMap[visitor.country] : null;
                      return (
                        <tr key={visitor.id} className="text-gray-600">
                          <td className="py-2 pr-3 whitespace-nowrap">
                            {new Date(visitor.timestamp).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-2 pr-3">
                            <span className="flex items-center gap-1">
                              {countryCode ? (
                                <Image
                                  src={`https://flagcdn.com/w20/${countryCode}.png`}
                                  alt={visitor.country || ""}
                                  width={16}
                                  height={12}
                                  className="rounded-sm"
                                />
                              ) : null}
                              {visitor.country === "Local" ? "Local" : visitor.country || "-"}
                            </span>
                          </td>
                          <td className="py-2 pr-3">{visitor.city || "-"}</td>
                          <td className="py-2 pr-3">{visitor.device || "-"}</td>
                          <td className="py-2 pr-3">{visitor.browser || "-"}</td>
                          <td className="py-2 truncate max-w-[120px]" title={visitor.referrer || "Direct"}>
                            {visitor.referrer || "Direct"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Pages by Views</h3>
          {stats?.pageStats && stats.pageStats.length > 0 ? (
            <div className="space-y-3">
              {stats.pageStats.slice(0, 10).map((page, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-6 text-sm text-gray-400">{index + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700 truncate max-w-xs">
                        {page.path === "/" ? "Homepage" : page.path}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {page.views}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-[#8B7355] h-1.5 rounded-full"
                        style={{
                          width: `${(page.views / stats.pageStats[0].views) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No data available</p>
          )}
        </div>

        {/* Devices */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Devices</h3>
          {stats?.deviceStats && stats.deviceStats.length > 0 ? (
            <div className="space-y-3">
              {stats.deviceStats.map((device, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    {device.device === "Mobile" ? (
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    ) : device.device === "Tablet" ? (
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{device.device}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {device.count}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No data available</p>
          )}
        </div>

        {/* Countries */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Countries</h3>
          {stats?.countryStats && stats.countryStats.length > 0 ? (
            <div className="space-y-3">
              {stats.countryStats.slice(0, 8).map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 flex items-center gap-2">
                    {country.country === "Local" && (
                      <span className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-xs">🏠</span>
                    )}
                    {country.country === "Unknown" && (
                      <span className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-xs">❓</span>
                    )}
                    {country.country === "Local" ? "Local (Development)" : country.country}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {country.count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No data available</p>
          )}
        </div>

        {/* Hourly Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Traffic by Hour</h3>
          {stats?.hourlyStats && stats.hourlyStats.length > 0 ? (
            <div className="flex items-end gap-1 h-32">
              {Array.from({ length: 24 }, (_, hour) => {
                const data = stats.hourlyStats.find((h) => h.hour === hour);
                const views = data?.views || 0;
                const maxViews = Math.max(...stats.hourlyStats.map((h) => h.views), 1);
                return (
                  <div
                    key={hour}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <div
                      className="w-full bg-[#8B7355] rounded-t transition-all hover:bg-[#6d5a43]"
                      style={{
                        height: `${(views / maxViews) * 100}%`,
                        minHeight: views > 0 ? "4px" : "0",
                      }}
                      title={`${hour}:00 - ${views} views`}
                    />
                    {hour % 4 === 0 && (
                      <span className="text-[10px] text-gray-400">{hour}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No data available</p>
          )}
        </div>
      </div>

      {/* All Visitors Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">All Visitors</h3>
        {paginatedVisitors.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    <th className="pb-3 pr-4">Page</th>
                    <th className="pb-3 pr-4">Device</th>
                    <th className="pb-3 pr-4">Browser</th>
                    <th className="pb-3 pr-4">Country</th>
                    <th className="pb-3 pr-4">Referrer</th>
                    <th className="pb-3">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedVisitors.map((visitor) => (
                    <tr key={visitor.id} className="text-sm">
                      <td className="py-3 pr-4 text-gray-900 max-w-xs truncate">
                        {visitor.path}
                      </td>
                      <td className="py-3 pr-4 text-gray-500">
                        {visitor.device || "-"}
                      </td>
                      <td className="py-3 pr-4 text-gray-500">
                        {visitor.browser || "-"}
                      </td>
                      <td className="py-3 pr-4 text-gray-500">
                        {visitor.country === "Local" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded text-xs">
                            <span>🏠</span> Local
                          </span>
                        ) : visitor.country === "Unknown" ? (
                          <span className="text-gray-400">-</span>
                        ) : (
                          visitor.country || "-"
                        )}
                      </td>
                      <td className="py-3 pr-4 text-gray-500 max-w-xs truncate">
                        {visitor.referrer || "Direct"}
                      </td>
                      <td className="py-3 text-gray-500 whitespace-nowrap">
                        {new Date(visitor.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, stats?.allVisitors?.length || 0)} of{" "}
                  {stats?.allVisitors?.length || 0} visitors
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400 text-sm py-8 text-center">
            No visitors recorded yet
          </p>
        )}
      </div>
    </div>
  );
}
