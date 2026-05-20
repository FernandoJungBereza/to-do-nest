import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
	constructor(private readonly configService: ConfigService) {}

	get nodeEnv(): string {
		return this.configService.getOrThrow<string>('NODE_ENV');
	}

	get port(): number {
		return this.configService.getOrThrow<number>('PORT');
	}

	get dbDatabase(): string {
		return this.configService.getOrThrow<string>('DB_PG_DATABASE');
	}

	get dbHost(): string {
		return this.configService.getOrThrow<string>('DB_PG_HOST');
	}

	get dbPort(): number {
		return this.configService.getOrThrow<number>('DB_PG_PORT');
	}

	get dbUsername(): string {
		return this.configService.getOrThrow<string>('DB_PG_USERNAME');
	}

	get dbPassword(): string {
		return this.configService.getOrThrow<string>('DB_PG_PASSWORD');
	}

	get dbSchema(): string {
		return this.configService.getOrThrow<string>('DB_SCHEMA');
	}

	get isDevelopment(): boolean {
		return this.nodeEnv === 'development';
	}

	get isProduction(): boolean {
		return this.nodeEnv === 'production';
	}

	get isTest(): boolean {
		return this.nodeEnv === 'test';
	}
}
