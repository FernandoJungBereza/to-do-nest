import { OutputUserPermissionsDto } from '@/modules/user/dtos/output-user-permissions.dto';

export abstract class PermissionUserRepositoryAbstract {
	abstract assign(userId: string, permissionId: string): Promise<void>;
	abstract isAssigned(userId: string, permissionId: string): Promise<boolean>;
	abstract findPermissionsByUserId(userId: string): Promise<OutputUserPermissionsDto>;
}
