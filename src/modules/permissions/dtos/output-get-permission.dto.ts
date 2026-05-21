import { ApiProperty } from '@nestjs/swagger';
import { PermissionRepositoryAbstractResponse } from '../interfaces/permission-repository-abstract-response';

export class OutputGetPermissionDto implements PermissionRepositoryAbstractResponse {
	@ApiProperty({ description: 'The id of the permission' })
	id: string;
	@ApiProperty({ description: 'The name of the permission' })
	name: string;
	@ApiProperty({ description: 'The description of the permission' })
	description: string;

	@ApiProperty({ description: 'Slugs linked to this permission', type: [String] })
	slugs: string[];
}
