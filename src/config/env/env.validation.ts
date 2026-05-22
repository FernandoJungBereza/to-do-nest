import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min, validateSync } from 'class-validator';

enum NodeEnvironment {
	Development = 'development',
	Production = 'production',
	Test = 'test',
}

export class EnvironmentVariables {
	@Expose()
	@IsEnum(NodeEnvironment)
	NODE_ENV: NodeEnvironment = NodeEnvironment.Development;

	@Expose()
	@Transform(({ value }) => Number(value))
	@IsInt()
	@Min(1)
	@Max(65535)
	PORT = 3000;

	@Expose()
	@IsString()
	@IsNotEmpty()
	DB_PG_DATABASE: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	DB_PG_HOST: string;

	@Expose()
	@Transform(({ value }) => Number(value))
	@IsInt()
	@Min(1)
	@Max(65535)
	DB_PG_PORT: number;

	@Expose()
	@IsString()
	@IsNotEmpty()
	DB_PG_USERNAME: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	DB_PG_PASSWORD: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	DB_SCHEMA: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	JWT_SECRET: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	JWT_REFRESH: string;
}

export function validateEnv(config: Record<string, unknown>): EnvironmentVariables {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true,
		excludeExtraneousValues: true,
	});

	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}

	return validatedConfig;
}
