import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
	@ApiProperty({
		description: 'The current password of the user',
		example: 'password',
		required: true,
		type: String,
		minLength: 8,
		maxLength: 255,
		format: 'password',
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(255)
	oldPassword: string;

	@ApiProperty({
		description: 'The new password of the user',
		example: 'newpassword',
		required: true,
		type: String,
		minLength: 8,
		maxLength: 255,
		format: 'password',
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(255)
	password: string;

	@ApiProperty({
		description: 'Confirmation of the new password',
		example: 'newpassword',
		required: true,
		type: String,
		minLength: 8,
		maxLength: 255,
		format: 'password',
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(255)
	confirmPassword: string;
}
