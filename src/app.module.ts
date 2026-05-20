import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule, EnvService } from './config/env';
import { createTypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { ToDoListModule } from './modules/to-do-list/to-do-list.module';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		EnvModule,

		TypeOrmModule.forRootAsync({
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: createTypeOrmConfig,
		}),

		UserModule,
		AuthModule,
		ToDoListModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
