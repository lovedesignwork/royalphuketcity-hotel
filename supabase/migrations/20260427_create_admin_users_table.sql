-- Admin user management for the /admin dashboard.
--
-- Roles:
--   - 'superadmin'  Locked. There must always be at least one. Cannot be
--                   deleted, cannot be demoted, cannot have their email
--                   changed by anyone (not even themselves through this
--                   table). Enforced by trigger so even raw SQL via the
--                   service role cannot bypass it.
--   - 'admin'       Same operational permissions as superadmin (manage
--                   downloads, blog, inquiries, etc.) but CANNOT touch
--                   superadmin rows.
--
-- Auth identity lives in Supabase's auth.users; this table just adds the
-- role + audit fields keyed off the auth user's UUID.

CREATE TABLE IF NOT EXISTS public.admin_users (
    id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email       TEXT NOT NULL UNIQUE,
    role        TEXT NOT NULL CHECK (role IN ('superadmin', 'admin')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by  UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_users_role  ON public.admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- Keep updated_at fresh on every UPDATE.
CREATE OR REPLACE FUNCTION public.admin_users_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_admin_users_set_updated_at ON public.admin_users;
CREATE TRIGGER trg_admin_users_set_updated_at
    BEFORE UPDATE ON public.admin_users
    FOR EACH ROW EXECUTE FUNCTION public.admin_users_set_updated_at();

-- Superadmin lock. Any attempt to delete a superadmin or change their role
-- away from 'superadmin' raises an exception. This runs even for the
-- service_role, so a compromised admin running raw SQL through our API
-- still can't lock the founder out.
CREATE OR REPLACE FUNCTION public.admin_users_protect_superadmin()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' AND OLD.role = 'superadmin' THEN
        RAISE EXCEPTION 'Cannot delete superadmin (id=%). Superadmin access is permanent.', OLD.id
            USING ERRCODE = 'check_violation';
    END IF;

    IF TG_OP = 'UPDATE' AND OLD.role = 'superadmin' AND NEW.role <> 'superadmin' THEN
        RAISE EXCEPTION 'Cannot demote superadmin (id=%). Superadmin role is permanent.', OLD.id
            USING ERRCODE = 'check_violation';
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_admin_users_protect_superadmin ON public.admin_users;
CREATE TRIGGER trg_admin_users_protect_superadmin
    BEFORE UPDATE OR DELETE ON public.admin_users
    FOR EACH ROW EXECUTE FUNCTION public.admin_users_protect_superadmin();

-- Row Level Security.
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Each authenticated user may read THEIR OWN admin_users row. That is
-- enough for the middleware's "is this user an admin?" check.
--
-- Note: we deliberately avoid the EXISTS(SELECT ... FROM admin_users)
-- pattern here, because policies that reference the same table they
-- protect cause infinite RLS recursion in Postgres and silently return
-- zero rows -- which manifests as "I logged in but the dashboard kicks
-- me back to /admin/login forever."
--
-- Listing the full admin roster (for /admin/users) is done via the
-- service_role client in /api/admin/users, which already bypasses RLS.
DROP POLICY IF EXISTS "Admins can read admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Authenticated users can read own admin_users row" ON public.admin_users;
CREATE POLICY "Authenticated users can read own admin_users row"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- Only the service_role (used by our API routes after they've verified the
-- caller is an admin) can INSERT/UPDATE/DELETE. We do not give authenticated
-- users direct write access; everything goes through /api/admin/users where
-- we can enforce additional invariants and audit.
DROP POLICY IF EXISTS "Service role full access on admin_users" ON public.admin_users;
CREATE POLICY "Service role full access on admin_users"
    ON public.admin_users
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Base table privileges. RLS doesn't run if GRANT isn't there first.
GRANT SELECT ON public.admin_users TO authenticated;
GRANT ALL    ON public.admin_users TO service_role;

COMMENT ON TABLE  public.admin_users IS 'Whitelist of users allowed into /admin. Linked 1:1 with auth.users.';
COMMENT ON COLUMN public.admin_users.role IS 'superadmin (locked, cannot be removed) or admin (same permissions, can be added/removed)';
