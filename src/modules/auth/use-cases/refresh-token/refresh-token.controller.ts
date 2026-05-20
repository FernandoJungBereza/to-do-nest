import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
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
	async refreshToken(@Body() refreshTokenDto: RefreshTokenDto, @Res({ passthrough: true }) res: Response) {
		const { access_token } = await this.refreshTokenUseCase.execute(refreshTokenDto.refreshToken);
		res.cookie('refreshToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 7 * 24 * 60 * 60 * 1000,
			sameSite: 'lax',
		});
		return { access_token };
	}
}
