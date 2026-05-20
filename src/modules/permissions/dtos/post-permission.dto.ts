import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
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
		description: 'The user id of the permission',
		example: '123e4567-e89b-12d3-a456-426614174000',
		required: true,
		type: String,
		format: 'uuid',
	})
	@IsString()
	@IsNotEmpty()
	@IsUUID()
	userId: string;
}
