import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginController } from './use-cases/login/login.controller';
import { LoginUseCase } from './use-cases/login/login.use-case';
import { RefreshTokenController } from './use-cases/refresh-token/refresh-token.controller';
import { RefreshTokenUseCase } from './use-cases/refresh-token/refresh-token.use-case';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.getOrThrow<string>('JWT_SECRET'),
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
