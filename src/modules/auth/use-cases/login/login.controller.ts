import { LoginDto } from '@/modules/auth/dtos/login.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { LoginUseCase } from './login.use-case';

@ApiTags('Auth')
@Controller('auth/login')
export class LoginController {
	constructor(private readonly loginUseCase: LoginUseCase) {}

	@Post()
	@ApiOperation({ summary: 'Login a user' })
	@ApiResponse({ status: 200, description: 'User logged in' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
		const { access_token } = await this.loginUseCase.execute(loginDto);
		const response = {
			access_token,
		};
		res.cookie('accessToken', access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 1 * 60 * 60 * 1000,
			sameSite: 'lax',
		});
		return response;
	}
}
