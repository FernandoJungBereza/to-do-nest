import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RefreshTokenDto {
	@ApiPropertyOptional({
		description: 'Optional fallback when not using cookies (e.g. Swagger). Normally sent via refreshToken cookie.',
	})
	@IsOptional()
	@IsString()
	refreshToken?: string;
}
