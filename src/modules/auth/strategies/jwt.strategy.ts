import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => req?.cookies?.accessToken ?? null,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),

			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
		});
	}

	async validate(payload: JwtPayload) {
		return { userId: payload.userId };
	}
}
