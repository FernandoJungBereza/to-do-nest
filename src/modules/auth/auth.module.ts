import { EnvModule, EnvService } from '@/config/env';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginController } from './use-cases/login/login.controller';
import { LoginUseCase } from './use-cases/login/login.use-case';
import { RefreshTokenController } from './use-cases/refresh-token/refresh-token.controller';
import { RefreshTokenUseCase } from './use-cases/refresh-token/refresh-token.use-case';

@Module({
	imports: [
		EnvModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: (env: EnvService) => ({
				secret: env.jwtSecret,
				signOptions: { expiresIn: '1h' },
			}),
		}),
		UserModule,
	],
	controllers: [LoginController, RefreshTokenController],
	providers: [LoginUseCase, RefreshTokenUseCase, JwtStrategy, JwtAuthGuard],
	exports: [JwtAuthGuard],
})
export class AuthModule {}
