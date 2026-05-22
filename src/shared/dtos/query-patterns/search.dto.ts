import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchDto {
	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	search?: string;
}
