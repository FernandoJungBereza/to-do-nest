/** Valores gravados em `permissions.name` e usados em `@RequirePermission()`. */
export enum Permission {
	Admin = 'admin',

	UsersList = 'users.list',
	UsersRead = 'users.read',
	UsersUpdate = 'users.update',
	UsersDelete = 'users.delete',
	UsersRestore = 'users.restore',
	UsersPermissions = 'users.permissions',

	PermissionsCreate = 'permissions.create',
	PermissionsRead = 'permissions.read',
	PermissionsDelete = 'permissions.delete',

	TodosList = 'todos.list',
	TodosRead = 'todos.read',
	TodosCreate = 'todos.create',
	TodosUpdate = 'todos.update',
	TodosDelete = 'todos.delete',
}
