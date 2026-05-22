import { ApiProperty } from '@nestjs/swagger';

export class OutputAvailablePermissionDto {
	@ApiProperty({ example: 'user.find', description: 'Value for POST /permissions `name` and Permission enum' })
	name: string;

	@ApiProperty({ example: 'Find user', description: 'Suggested title for UI' })
	title: string;

	@ApiProperty({ example: 'Get user by id', description: 'Suggested description when creating the profile' })
	suggestedDescription: string;

	@ApiProperty({ description: 'Whether a row with this name already exists in permissions' })
	registered: boolean;
}

export class OutputAvailablePermissionModuleDto {
	@ApiProperty({ example: 'User' })
	name: string;

	@ApiProperty({ type: [OutputAvailablePermissionDto] })
	permissions: OutputAvailablePermissionDto[];
}

export class OutputAvailablePermissionsDto {
	@ApiProperty({ type: [OutputAvailablePermissionModuleDto] })
	modules: OutputAvailablePermissionModuleDto[];
}
