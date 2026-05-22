import { ApiProperty } from '@nestjs/swagger';
import { PermissionRepositoryAbstractResponse } from '../interfaces/permission-repository-abstract-response';

export class OutputGetPermissionDto implements PermissionRepositoryAbstractResponse {
	@ApiProperty({ description: 'The id of the permission' })
	id: string;

	@ApiProperty({ description: 'Permission name (matches Permission enum)', example: 'users.read' })
	name: string;

	@ApiProperty({ description: 'The description of the permission' })
	description: string;
}
