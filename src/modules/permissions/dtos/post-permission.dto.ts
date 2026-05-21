import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { PostPermissionDtoInterface } from '../interfaces/post-permission-dto.interface';

export class PostPermissionDto implements PostPermissionDtoInterface {
	@ApiProperty({
		description: 'The name of the permission',
		example: 'Read',
		required: true,
		type: String,
		minLength: 3,
		maxLength: 255,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(255)
	@IsString()
	name: string;

	@ApiProperty({
		description: 'The description of the permission',
		example: 'Read the user data',
		required: true,
		type: String,
		minLength: 3,
		maxLength: 255,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(255)
	@IsString()
	description: string;

	@ApiProperty({
		description: 'The permission slug of the permission',
		example: ['read', 'write', 'delete'],
		required: true,
		type: [String],
	})
	@IsArray()
	@IsNotEmpty()
	@IsString({ each: true })
	permissionSlug: string[];
}
