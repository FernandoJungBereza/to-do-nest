import { EnvService } from '@/config/env';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(env: EnvService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => req?.cookies?.accessToken ?? null,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			ignoreExpiration: false,
			secretOrKey: env.jwtSecret,
		});
	}

	async validate(payload: JwtPayload) {
		return { userId: payload.userId };
	}
}
