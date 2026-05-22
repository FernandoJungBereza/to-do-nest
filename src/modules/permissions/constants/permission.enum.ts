/**
 * Permission names stored in `permissions.name`.
 * Must match @RequirePermission() on controllers and POST /permissions body `name`.
 */
export enum Permission {
	Admin = 'admin',

	UsersPaginated = 'users.paginated',
	UserFind = 'user.find',
	UserUpdate = 'user.update',
	UserDelete = 'user.delete',
	UserRestore = 'user.restore',
	UserSoftDelete = 'user.soft-delete',
	UserFindPermission = 'user.find.permission',
	UserAssignPermission = 'user.assign.permission',

	PermissionsAvailable = 'permissions.available',
	PermissionsCreate = 'permissions.create',
	PermissionsList = 'permissions.list',
	PermissionsFind = 'permissions.find',
	PermissionsDelete = 'permissions.delete',

	ToDoListPaginated = 'to-do-list.paginated',
	ToDoListFind = 'to-do-list.find',
	ToDoListCreate = 'to-do-list.create',
	ToDoListUpdate = 'to-do-list.update',
	ToDoListDelete = 'to-do-list.delete',
}

export const ALL_PERMISSIONS: Permission[] = Object.values(Permission).filter(
	(value): value is Permission => typeof value === 'string',
);
