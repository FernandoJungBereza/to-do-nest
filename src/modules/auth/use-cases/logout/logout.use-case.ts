import { EnvService } from '@/config/env';
import { clearAuthCookies } from '@/modules/auth/helpers/auth-cookies.helper';
import { GetOneUserByIdUseCase } from '@/modules/user/use-cases/get-one-user-by-id/get-one-user-by-id.use-case';
import { Injectable } from '@nestjs/common';
import type { Response } from 'express';

@Injectable()
export class LogoutUseCase {
	constructor(
		private readonly getOneUserByIdUseCase: GetOneUserByIdUseCase,
		private readonly env: EnvService,
	) {}

	async execute(userId: string, res: Response): Promise<void> {
		await this.getOneUserByIdUseCase.execute(userId);
		clearAuthCookies(res, { secure: this.env.isProduction });
	}
}
