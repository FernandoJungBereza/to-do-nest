import { EnvService } from '@/config/env';
import { setAuthCookies } from '@/modules/auth/helpers/auth-cookies.helper';
import { Body, Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { Public } from '../../decorator/public.decorator';
import { RefreshTokenDto } from '../../dtos/refresh-token.dto';
import { RefreshTokenUseCase } from './refresh-token.use-case';

@ApiTags('Auth')
@Controller('auth')
export class RefreshTokenController {
	constructor(
		private readonly refreshTokenUseCase: RefreshTokenUseCase,
		private readonly env: EnvService,
	) {}

	@Public()
	@Post('refresh-token')
	@ApiOperation({ summary: 'Refresh session (reads refreshToken cookie)' })
	@ApiResponse({ status: 200, description: 'New access token' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	async refreshToken(
		@Req() req: Request,
		@Body() refreshTokenDto: RefreshTokenDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const refreshToken = req.cookies?.refreshToken ?? refreshTokenDto.refreshToken;

		if (!refreshToken) {
			throw new UnauthorizedException('Refresh token not found');
		}

		const { access_token, refresh_token } = await this.refreshTokenUseCase.execute(refreshToken);

		setAuthCookies(res, access_token, refresh_token, { secure: this.env.isProduction });

		return { access_token };
	}
}
