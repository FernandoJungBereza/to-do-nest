import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NameDto {
	@ApiProperty({ description: 'User name', example: 'John Doe' })
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	name?: string;
}
