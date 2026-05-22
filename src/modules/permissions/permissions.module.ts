import { PermissionUserEntity } from '@/modules/permission-user/entities/permission-user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsAuthorizationService } from './authorization/permissions-authorization.service';
import { PermissionsEntity } from './entities/permissions.entity';
import { PermissionsGuard } from './guards/permissions.guard';
import { PermissionsRepository } from './repositories/permissions.repository';
import { PermissionsRepositoryAbstract } from './repositories/permissions.repository.abstract';
import { DeletePermissionController } from './use-cases/delete-permission/delete-permission.controller';
import { DeletePermissionUseCase } from './use-cases/delete-permission/delete-permission.use-case';
import { FindOneByIdPermissionController } from './use-cases/find-one-by-id-permission/find-one-by-id-permission.controller';
import { FindOneByIdPermissionUseCase } from './use-cases/find-one-by-id-permission/find-one-by-id-permission.use-case';
import { GetAllPermissionController } from './use-cases/get-all-permissions/get-all-permission.controller';
import { GetAllPermissionUseCase } from './use-cases/get-all-permissions/get-all-permission.use-case';
import { GetAvailablePermissionsController } from './use-cases/get-available-permissions/get-available-permissions.controller';
import { GetAvailablePermissionsUseCase } from './use-cases/get-available-permissions/get-available-permissions.use-case';
import { GetExistingPermissionUseCase } from './use-cases/get-existing-permission.use-case';
import { PostPermissionController } from './use-cases/post-permission/post-permission.controller';
import { PostPermissionUseCase } from './use-cases/post-permission/post-permission.use-case';
import { ThrowIfExistPermissionUseCase } from './use-cases/throw-if-exist-permission.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([PermissionsEntity, PermissionUserEntity])],
	controllers: [
		GetAvailablePermissionsController,
		PostPermissionController,
		GetAllPermissionController,
		FindOneByIdPermissionController,
		DeletePermissionController,
	],
	providers: [
		PermissionsAuthorizationService,
		PermissionsGuard,
		PostPermissionUseCase,
		ThrowIfExistPermissionUseCase,
		GetAllPermissionUseCase,
		GetExistingPermissionUseCase,
		FindOneByIdPermissionUseCase,
		GetAvailablePermissionsUseCase,
		DeletePermissionUseCase,
		{
			provide: PermissionsRepositoryAbstract,
			useClass: PermissionsRepository,
		},
	],
	exports: [GetExistingPermissionUseCase, PermissionsAuthorizationService, PermissionsGuard],
})
export class PermissionsModule {}
