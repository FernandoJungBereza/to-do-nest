import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EmailDto {
	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	email?: string;
}
