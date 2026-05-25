import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
	@ApiProperty({
		description: 'The name of the user',
		example: 'John Doe',
		required: true,
		type: String,
		minLength: 3,
		maxLength: 255,
		format: 'text',
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(255)
	name: string;

	@ApiProperty({
		description: 'The email of the user',
		example: 'john.doe@example.com',
		required: true,
		type: String,
		minLength: 3,
		maxLength: 255,
		format: 'email',
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(255)
	@IsEmail()
	email: string;
}
