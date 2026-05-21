import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AssignPermissionDto {
	@ApiProperty({ description: 'Permission id to assign' })
	@IsUUID()
	@IsNotEmpty()
	permissionId: string;
}
