"use client";

import { useEffect, useState } from "react";

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
}

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
