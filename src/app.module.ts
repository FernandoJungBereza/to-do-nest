import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule, EnvService } from './config/env';
import { createTypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from './modules/auth/guards/permissions.guard';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { ToDoListModule } from './modules/to-do-list/to-do-list.module';
import { UserModule } from './modules/user/user.module';

@Module({
	imports: [
		EnvModule,
		TypeOrmModule.forRootAsync({
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: createTypeOrmConfig,
		}),
		UserModule,
		AuthModule,
		ToDoListModule,
		PermissionsModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: PermissionsGuard,
		},
	],
})
export class AppModule {}
