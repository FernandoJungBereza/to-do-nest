import { OutputGetPermissionDto } from '@/modules/permissions/dtos/output-get-permission.dto';

export interface UserPermissionsInterface {
	id: string;
	name: string;
	permissions: OutputGetPermissionDto[];
}
