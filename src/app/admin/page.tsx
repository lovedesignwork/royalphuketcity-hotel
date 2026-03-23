"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface VisitorStats {
  totalPageViews: number;
  uniqueVisitors: number;
  todayPageViews: number;
  todayUniqueVisitors: number;
  weeklyPageViews: number;
  monthlyPageViews: number;
  topPages: { path: string; views: number }[];
  recentVisitors: {
    id: string;
    path: string;
    timestamp: string;
    country?: string;
    device?: string;
  }[];
  dailyStats: { date: string; views: number; visitors: number }[];
}

interface InquiryStats {
  total: number;
  newCount: number;
  recentInquiries: {
    id: string;
    name: string;
    email: string;
    subject?: string;
    status?: string;
    created_at: string;
  }[];
}

function StatCard({
  title,
  value,
  change,
  changeType,
  icon,
}: {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {change && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${
                changeType === "increase"
                  ? "text-green-600"
                  : changeType === "decrease"
                  ? "text-red-600"
                  : "text-gray-500"
              }`}
            >
              {changeType === "increase" && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {changeType === "decrease" && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              {change}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-[#8B7355]/10 flex items-center justify-center text-[#8B7355]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function SimpleBarChart({ data }: { data: { date: string; views: number }[] }) {
  const maxViews = Math.max(...data.map((d) => d.views), 1);

  return (
    <div className="flex items-end gap-1 h-32">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex-1 flex flex-col items-center gap-1"
        >
          <div
            className="w-full bg-[#8B7355] rounded-t transition-all hover:bg-[#6d5a43]"
            style={{
              height: `${(item.views / maxViews) * 100}%`,
              minHeight: item.views > 0 ? "4px" : "0",
            }}
            title={`${item.views} views`}
          />
          <span className="text-[10px] text-gray-400">
            {new Date(item.date).getDate()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [inquiryStats, setInquiryStats] = useState<InquiryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  async function fetchStats() {
    try {
      const [statsRes, inquiriesRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/inquiries?limit=5"),
      ]);

      if (!statsRes.ok) throw new Error("Failed to fetch stats");
      const data = await statsRes.json();
      setStats(data);

      if (inquiriesRes.ok) {
        const inquiriesData = await inquiriesRes.json();
        const newCount = inquiriesData.inquiries.filter(
          (i: { status?: string }) => i.status === "new" || !i.status
        ).length;
        setInquiryStats({
          total: inquiriesData.total,
          newCount,
          recentInquiries: inquiriesData.inquiries,
        });
      }

      setError(null);
    } catch (err) {
      setError("Failed to load statistics");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-[#8B7355] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchStats}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome to Royal Phuket City Hotel Admin Panel
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
          <button
            onClick={fetchStats}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Today&apos;s Page Views"
          value={stats?.todayPageViews || 0}
          change="vs yesterday"
          changeType="neutral"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
        />
        <StatCard
          title="Today&apos;s Visitors"
          value={stats?.todayUniqueVisitors || 0}
          change="unique visitors"
          changeType="neutral"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatCard
          title="This Week"
          value={stats?.weeklyPageViews || 0}
          change="page views"
          changeType="neutral"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          title="This Month"
          value={stats?.monthlyPageViews || 0}
          change="page views"
          changeType="neutral"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <Link href="/admin/inquiries" className="block">
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow relative">
            {inquiryStats?.newCount ? (
              <span className="absolute top-4 right-4 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-pulse">
                {inquiryStats.newCount}
              </span>
            ) : null}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Inquiries</p>
                <p className="text-3xl font-bold text-gray-900">
                  {inquiryStats?.total || 0}
                </p>
                <p className="text-sm mt-2 text-gray-500">
                  {inquiryStats?.newCount || 0} new
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#8B7355]/10 flex items-center justify-center text-[#8B7355]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Views Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Daily Page Views (Last 14 Days)
          </h3>
          {stats?.dailyStats && stats.dailyStats.length > 0 ? (
            <SimpleBarChart data={stats.dailyStats} />
          ) : (
            <div className="h-32 flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top Pages</h3>
          {stats?.topPages && stats.topPages.length > 0 ? (
            <div className="space-y-3">
              {stats.topPages.slice(0, 5).map((page, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-sm text-gray-600 truncate max-w-[180px]">
                    {page.path === "/" ? "Homepage" : page.path}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {page.views.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm">No data available</div>
          )}
        </div>
      </div>

      {/* Recent Visitors */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Recent Visitors</h3>
          <Link
            href="/admin/analytics"
            className="text-sm text-[#8B7355] hover:underline"
          >
            View All
          </Link>
        </div>
        {stats?.recentVisitors && stats.recentVisitors.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                  <th className="pb-3">Page</th>
                  <th className="pb-3">Device</th>
                  <th className="pb-3">Country</th>
                  <th className="pb-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentVisitors.slice(0, 10).map((visitor) => (
                  <tr key={visitor.id} className="text-sm">
                    <td className="py-3 text-gray-900 max-w-xs truncate">
                      {visitor.path}
                    </td>
                    <td className="py-3 text-gray-500">{visitor.device || "Unknown"}</td>
                    <td className="py-3 text-gray-500">{visitor.country || "Unknown"}</td>
                    <td className="py-3 text-gray-500">
                      {new Date(visitor.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-400 text-sm py-8 text-center">
            No recent visitors recorded yet
          </div>
        )}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Recent Inquiries</h3>
          <Link
            href="/admin/inquiries"
            className="text-sm text-[#8B7355] hover:underline"
          >
            View All
          </Link>
        </div>
        {inquiryStats?.recentInquiries && inquiryStats.recentInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Subject</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiryStats.recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="text-sm">
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          inquiry.status === "new" || !inquiry.status
                            ? "bg-blue-100 text-blue-700"
                            : inquiry.status === "replied"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {inquiry.status || "New"}
                      </span>
                    </td>
                    <td className="py-3 text-gray-900 font-medium">{inquiry.name}</td>
                    <td className="py-3 text-gray-500">{inquiry.email}</td>
                    <td className="py-3 text-gray-500 max-w-xs truncate">
                      {inquiry.subject || "-"}
                    </td>
                    <td className="py-3 text-gray-500">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-400 text-sm py-8 text-center">
            No inquiries yet
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Link
          href="/admin/inquiries"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                Inquiries
              </h4>
              <p className="text-sm text-gray-500">Manage contact submissions</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/downloads"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                Downloads
              </h4>
              <p className="text-sm text-gray-500">Manage PDF documents</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/analytics"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                Detailed Analytics
              </h4>
              <p className="text-sm text-gray-500">View detailed visitor data</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                Settings
              </h4>
              <p className="text-sm text-gray-500">Configure Google Analytics</p>
            </div>
          </div>
        </Link>

        <a
          href="https://analytics.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.84 2.998v18.004c0 1.656-1.344 3-3 3H4.16c-1.656 0-3-1.344-3-3V2.998c0-1.656 1.344-3 3-3h15.68c1.656 0 3 1.344 3 3zM20.84 21V3c0-.551-.449-1-1-1H4.16c-.551 0-1 .449-1 1v18c0 .551.449 1 1 1h15.68c.551 0 1-.449 1-1z" />
                <path d="M8.84 13v5h-3v-5h3zm5-4v9h-3V9h3zm5-4v13h-3V5h3z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                Google Analytics
              </h4>
              <p className="text-sm text-gray-500">Open GA4 Dashboard</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
