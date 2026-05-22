-- Permissions model: one row per profile (name = Permission enum value, no slugs table).
-- PostgreSQL. Adjust schema if not "public".

BEGIN;

DELETE FROM permission_user;
DELETE FROM permissions;

-- Optional: drop legacy slugs table if it still exists from older versions
DROP TABLE IF EXISTS permissions_slugs;

-- Administrator (name must be "admin" — matches Permission.Admin)
INSERT INTO permissions (id, name, description, created_at, updated_at)
VALUES (
	'00000000-0000-4000-8000-000000000001',
	'admin',
	'Full access',
	NOW(),
	NOW()
);

-- Assign admin to your user (replace USER_ID)
-- INSERT INTO permission_user (id, "permissionId", "userId", created_at, updated_at)
-- VALUES (
-- 	gen_random_uuid(),
-- 	'00000000-0000-4000-8000-000000000001',
-- 	'YOUR-USER-UUID-HERE',
-- 	NOW(),
-- 	NOW()
-- );

-- Example: create a permission profile via SQL (same as POST /permissions)
-- INSERT INTO permissions (id, name, description, created_at, updated_at)
-- VALUES (
-- 	gen_random_uuid(),
-- 	'user.find',
-- 	'Get user by id',
-- 	NOW(),
-- 	NOW()
-- );

COMMIT;
