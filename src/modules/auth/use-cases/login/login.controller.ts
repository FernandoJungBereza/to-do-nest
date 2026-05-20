import { LoginDto } from '@/modules/auth/dtos/login.dto';
import { setAuthCookies } from '@/modules/auth/helpers/auth-cookies.helper';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { Public } from '../../decorator/public.decorator';
import { LoginUseCase } from './login.use-case';

@ApiTags('Auth')
@Controller('auth/login')
export class LoginController {
	constructor(private readonly loginUseCase: LoginUseCase) {}

	@Public()
	@Post()
	@ApiOperation({ summary: 'Login a user' })
	@ApiResponse({ status: 200, description: 'User logged in' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
		const { user, access_token, refresh_token } = await this.loginUseCase.execute(loginDto);

		setAuthCookies(res, access_token, refresh_token);

		return {
			user,
			access_token,
		};
	}
}
