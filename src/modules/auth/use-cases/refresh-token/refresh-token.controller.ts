import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from '../../dtos/refresh-token.dto';
import { RefreshTokenUseCase } from './refresh-token.use-case';

@ApiTags('Auth')
@Controller('auth')
export class RefreshTokenController {
	constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) {}

	@Post('refresh-token')
	@ApiOperation({ summary: 'Refresh a token' })
	@ApiResponse({ status: 200, description: 'Token refreshed' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
		return await this.refreshTokenUseCase.execute(refreshTokenDto.refreshToken);
	}
}
