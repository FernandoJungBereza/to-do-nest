import { OutputGetPermissionDto } from '../dtos/output-get-permission.dto';
import { PermissionsEntity } from '../entities/permissions.entity';

export function mapPermissionToOutput(permission: PermissionsEntity): OutputGetPermissionDto {
	return {
		id: permission.id,
		name: permission.name,
		description: permission.description,
		slugs: permission.permissionSlugs?.map((permissionSlug) => permissionSlug.slug) ?? [],
	};
}
