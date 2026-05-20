import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NameDto {
	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	name?: string;
}
