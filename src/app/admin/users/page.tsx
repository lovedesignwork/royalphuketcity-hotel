"use client";

import { useCallback, useEffect, useState } from "react";

interface AdminUser {
  id: string;
  email: string;
  role: "superadmin" | "admin";
  created_at: string;
  updated_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setListError(null);
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Failed (${res.status})`);
      }
      const data = await res.json();
      setUsers(data.users || []);
      setCurrentUserId(data.currentUserId || null);
    } catch (err) {
      setListError(err instanceof Error ? err.message : "Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    setCreateSuccess(null);
    setIsCreating(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Failed to add user.");

      setCreateSuccess(
        `Added ${email}. Share this temporary password with them in person or on Line: ${password}`
      );
      setEmail("");
      setPassword("");
      await fetchUsers();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Failed to add user.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (user: AdminUser) => {
    if (user.role === "superadmin") return;
    if (user.id === currentUserId) return;
    if (!confirm(`Remove ${user.email} from the admin panel? They will no longer be able to log in.`)) {
      return;
    }
    setDeletingId(user.id);
    try {
      const res = await fetch(`/api/admin/users?id=${encodeURIComponent(user.id)}`, {
        method: "DELETE",
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Failed to remove user.");
      await fetchUsers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to remove user.");
    } finally {
      setDeletingId(null);
    }
  };

  const generateRandomPassword = () => {
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
    let out = "";
    const arr = new Uint32Array(14);
    crypto.getRandomValues(arr);
    for (let i = 0; i < arr.length; i++) {
      out += chars[arr[i] % chars.length];
    }
    setPassword(out);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            People who can sign in at <code className="px-1.5 py-0.5 bg-gray-100 rounded">/admin/login</code>.
            New users have the same permissions as the superadmin, but cannot remove the superadmin.
          </p>
        </div>

        {/* Add user */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Add a new admin</h2>
          <p className="text-sm text-gray-500 mb-4">
            Enter their email and a temporary password. Share the password with them
            in person or via Line — they can change it later from their account.
          </p>

          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3"
          >
            <input
              type="email"
              required
              placeholder="email@royalphuketcity.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
            />
            <div className="flex gap-2">
              <input
                type="text"
                required
                minLength={8}
                placeholder="Temporary password (min 8 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
              />
              <button
                type="button"
                onClick={generateRandomPassword}
                className="px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
                title="Generate a random secure password"
              >
                Generate
              </button>
            </div>
            <button
              type="submit"
              disabled={isCreating}
              className="px-5 py-2.5 bg-[#8B7355] text-white text-sm font-medium rounded-lg hover:bg-[#7a6548] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCreating ? "Adding…" : "Add user"}
            </button>
          </form>

          {createError && (
            <div className="mt-3 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {createError}
            </div>
          )}
          {createSuccess && (
            <div className="mt-3 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-800">
              {createSuccess}
            </div>
          )}
        </div>

        {/* Users list */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Admins{" "}
              <span className="text-sm font-normal text-gray-500">({users.length})</span>
            </h2>
          </div>

          {isLoading ? (
            <div className="px-6 py-10 text-center text-sm text-gray-500">Loading…</div>
          ) : listError ? (
            <div className="px-6 py-6 text-sm text-red-600">{listError}</div>
          ) : users.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-gray-500">
              No admins yet.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Email</th>
                  <th className="px-6 py-3 text-left font-medium">Role</th>
                  <th className="px-6 py-3 text-left font-medium">Added</th>
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => {
                  const isSuper = u.role === "superadmin";
                  const isMe = u.id === currentUserId;
                  const canDelete = !isSuper && !isMe;
                  return (
                    <tr key={u.id}>
                      <td className="px-6 py-4 text-gray-900">
                        {u.email}
                        {isMe && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            you
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isSuper ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 1l2.928 6.026L19.5 8.05l-4.75 4.668L15.856 19 10 15.927 4.144 19l1.106-6.282L.5 8.05l6.572-1.024L10 1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Superadmin
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                            Admin
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(u.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {canDelete ? (
                          <button
                            onClick={() => handleDelete(u)}
                            disabled={deletingId === u.id}
                            className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-60"
                          >
                            {deletingId === u.id ? "Removing…" : "Remove"}
                          </button>
                        ) : (
                          <span
                            className="text-xs text-gray-400"
                            title={
                              isSuper
                                ? "Superadmin access is permanent and cannot be removed."
                                : "You cannot remove your own account."
                            }
                          >
                            {isSuper ? "Locked" : "—"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
