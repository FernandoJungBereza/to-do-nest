import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TitleDto {
	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	title?: string;
}
