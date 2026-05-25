import type { AuthenticatedRequest } from '@/modules/auth/interfaces/authenticated-request.interface';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { LogoutUseCase } from './logout.use-case';

@ApiTags('Auth')
@Controller('auth')
export class LogoutController {
	constructor(private readonly logoutUseCase: LogoutUseCase) {}

	@Post('logout')
	@ApiOperation({ summary: 'Logout the current user' })
	@ApiResponse({ status: 200, description: 'User logged out' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	async logout(@Req() req: AuthenticatedRequest, @Res({ passthrough: true }) res: Response) {
		await this.logoutUseCase.execute(req.user.userId, res);
	}
}
