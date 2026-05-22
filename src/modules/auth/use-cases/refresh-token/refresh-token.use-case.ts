import { EnvService } from '@/config/env';
import { JwtPayload } from '@/modules/auth/interfaces/jwt-payload.interface';
import { GetOneUserByIdUseCase } from '@/modules/user/use-cases/get-one-user-by-id/get-one-user-by-id.use-case';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenUseCase {
	constructor(
		private readonly jwtService: JwtService,
		private readonly env: EnvService,
		private readonly getOneUserByIdUseCase: GetOneUserByIdUseCase,
	) {}

	async execute(refreshToken: string): Promise<{
		access_token: string;
		refresh_token: string;
	}> {
		const decoded = this.jwtService.verify<JwtPayload>(refreshToken, {
			secret: this.env.jwtRefresh,
		});
		if (!decoded) {
			throw new UnauthorizedException('Invalid refresh token');
		}

		const user = await this.getOneUserByIdUseCase.execute(decoded.userId);

		return {
			access_token: this.jwtService.sign({ userId: user.id }, { expiresIn: '1h' }),
			refresh_token: this.jwtService.sign(
				{ userId: user.id },
				{ secret: this.env.jwtRefresh, expiresIn: '7d' },
			),
		};
	}
}
