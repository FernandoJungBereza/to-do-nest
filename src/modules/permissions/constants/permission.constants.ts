export const ADMIN_SLUG = 'admin';

/** Module folder names skipped entirely (no permission slugs). */
export const PERMISSION_ROUTE_SKIP_MODULES = ['auth'] as const;

/** Allowed @Controller() prefixes per module folder (strict — mismatch throws on discover). */
export const MODULE_CONTROLLER_PREFIXES: Record<string, readonly string[]> = {
	user: ['users', 'users/paginated'],
	'to-do-list': ['to-do-lists', 'to-do-lists/paginated'],
	permissions: ['permissions'],
};
