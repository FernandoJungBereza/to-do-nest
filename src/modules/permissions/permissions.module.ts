import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsEntity } from './entities/permissions.entity';
import { GetAllPermissionController } from './use-cases/get-all-permissions/get-all-permission.controller';
import { GetAllPermissionUseCase } from './use-cases/get-all-permissions/get-all-permission.use-case';
import { PostPermissionController } from './use-cases/post-permission/post-permission.controller';
import { PostPermissionUseCase } from './use-cases/post-permission/post-permission.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([PermissionsEntity])],
	controllers: [PostPermissionController, GetAllPermissionController],
	providers: [PostPermissionUseCase, GetAllPermissionUseCase],
})
export class PermissionsModule {}
