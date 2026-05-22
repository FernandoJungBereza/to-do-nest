import { Permission } from './permission.enum';

export interface PermissionMetadata {
	module: string;
	title: string;
	defaultDescription: string;
}

export const PERMISSION_METADATA: Record<Permission, PermissionMetadata> = {
	[Permission.Admin]: {
		module: 'system',
		title: 'Administrator',
		defaultDescription: 'Full access to all routes',
	},

	[Permission.UsersPaginated]: {
		module: 'user',
		title: 'List users (paginated)',
		defaultDescription: 'Paginated user list',
	},
	[Permission.UserFind]: {
		module: 'user',
		title: 'Find user',
		defaultDescription: 'Get user by id',
	},
	[Permission.UserUpdate]: {
		module: 'user',
		title: 'Update user',
		defaultDescription: 'Update user',
	},
	[Permission.UserDelete]: {
		module: 'user',
		title: 'Delete user',
		defaultDescription: 'Hard delete user',
	},
	[Permission.UserRestore]: {
		module: 'user',
		title: 'Restore user',
		defaultDescription: 'Restore soft-deleted user',
	},
	[Permission.UserSoftDelete]: {
		module: 'user',
		title: 'Soft delete user',
		defaultDescription: 'Soft delete user',
	},
	[Permission.UserFindPermission]: {
		module: 'user',
		title: 'Find user permissions',
		defaultDescription: 'List permissions assigned to a user',
	},
	[Permission.UserAssignPermission]: {
		module: 'user',
		title: 'Assign permission',
		defaultDescription: 'Assign a permission profile to a user',
	},

	[Permission.PermissionsAvailable]: {
		module: 'permissions',
		title: 'List available permissions',
		defaultDescription: 'Catalog of permission names from enum',
	},
	[Permission.PermissionsCreate]: {
		module: 'permissions',
		title: 'Create permission',
		defaultDescription: 'Create permission profile in database',
	},
	[Permission.PermissionsList]: {
		module: 'permissions',
		title: 'List permissions',
		defaultDescription: 'List permission profiles',
	},
	[Permission.PermissionsFind]: {
		module: 'permissions',
		title: 'Find permission',
		defaultDescription: 'Get permission profile by id',
	},
	[Permission.PermissionsDelete]: {
		module: 'permissions',
		title: 'Delete permission',
		defaultDescription: 'Delete permission profile',
	},

	[Permission.ToDoListPaginated]: {
		module: 'to-do-list',
		title: 'List to-do lists (paginated)',
		defaultDescription: 'Paginated to-do lists',
	},
	[Permission.ToDoListFind]: {
		module: 'to-do-list',
		title: 'Find to-do list',
		defaultDescription: 'Get to-do list by id',
	},
	[Permission.ToDoListCreate]: {
		module: 'to-do-list',
		title: 'Create to-do list',
		defaultDescription: 'Create to-do list',
	},
	[Permission.ToDoListUpdate]: {
		module: 'to-do-list',
		title: 'Update to-do list',
		defaultDescription: 'Update to-do list',
	},
	[Permission.ToDoListDelete]: {
		module: 'to-do-list',
		title: 'Delete to-do list',
		defaultDescription: 'Delete to-do list',
	},
};
