import { Permission } from '@/modules/permissions/constants/permission.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { PostPermissionDtoInterface } from '../interfaces/post-permission-dto.interface';

export class PostPermissionDto implements PostPermissionDtoInterface {
	@ApiProperty({
		description: 'Permission name (must match Permission enum — same value used in @RequirePermission)',
		example: Permission.UsersRead,
		enum: Permission,
	})
	@IsEnum(Permission)
	name: Permission;

	@ApiProperty({
		description: 'Human-readable description of this permission profile',
		example: 'Allows finding a user by id',
		minLength: 3,
		maxLength: 255,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(255)
	description: string;
}
