import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvService } from './env';

export function createTypeOrmConfig(env: EnvService): TypeOrmModuleOptions {
	return {
		type: 'postgres',
		host: env.dbHost,
		port: env.dbPort,
		username: env.dbUsername,
		password: env.dbPassword,
		database: env.dbDatabase,
		schema: env.dbSchema,
		entities: [__dirname + '/../**/*.entity.{js,ts}'],
		migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
		synchronize: env.isDevelopment,
		logging: env.isDevelopment,
	};
}
