import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { UpdateToDoListDtoInterface } from '../interfaces/update-to-do-list-dto.interface';

export class UpdateToDoListDto implements UpdateToDoListDtoInterface {
	@ApiProperty({
		description: 'The title of the to-do list',
		example: 'Buy groceries',
		required: true,
		type: String,
		minLength: 3,
		maxLength: 255,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(255)
	title: string;

	@ApiProperty({
		description: 'The description of the to-do list',
		example: 'Buy groceries for the week',
		required: false,
		type: String,
		minLength: 3,
	})
	@IsString()
	@MaxLength(255)
	@IsOptional()
	description?: string;

	@ApiProperty({
		description: 'The completed status of the to-do list',
		example: true,
		required: false,
		type: Boolean,
		default: false,
	})
	@IsBoolean()
	@IsOptional()
	completed?: boolean;

	@ApiProperty({
		description: 'The user id of the to-do list',
		example: '123e4567-e89b-12d3-a456-426614174000',
		required: true,
		type: String,
	})
	@IsString()
	@IsNotEmpty()
	@IsUUID()
	userId: string;
}
