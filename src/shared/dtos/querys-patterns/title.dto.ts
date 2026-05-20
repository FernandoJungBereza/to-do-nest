import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class TitleDto {
	@ApiProperty({ description: 'The title of the to-do list', example: 'Buy groceries' })
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	title?: string;
}
