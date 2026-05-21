import { PermissionUserEntity } from '@/modules/permission-user/entities/permission-user.entity';
import { PermissionsGuard } from '@/modules/auth/guards/permissions.guard';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsAuthorizationService } from './authorization/permissions-authorization.service';
import { RouteDiscoveryService } from './authorization/route-discovery.service';
import { RouteManifestService } from './authorization/route-manifest.service';
import { PermissionsSlugsEntity } from './entities/permissions-slugs.entity';
import { PermissionsEntity } from './entities/permissions.entity';
import { PermissionsRepository } from './repositories/permissions.repository';
import { PermissionsRepositoryAbstract } from './repositories/permissions.repository.abstratct';
import { PermissionsSlugsRepository } from './repositories/permissions-slugs.repository';
import { PermissionsSlugsRepositoryAbstract } from './repositories/permissions-slugs.repository.abstract';
import { DeletePermissionController } from './use-cases/delete-permission/delete-permission.controller';
import { DeletePermissionUseCase } from './use-cases/delete-permission/delete-permission.use-case';
import { FindOneByIdPermissionController } from './use-cases/find-one-by-id-permission/find-one-by-id-permission.controller';
import { FindOneByIdPermissionUseCase } from './use-cases/find-one-by-id-permission/find-one-by-id-permission.use-case';
import { GetAllPermissionController } from './use-cases/get-all-permissions/get-all-permission.controller';
import { GetAllPermissionUseCase } from './use-cases/get-all-permissions/get-all-permission.use-case';
import { GetAvailableSlugsController } from './use-cases/get-available-slugs/get-available-slugs.controller';
import { GetAvailableSlugsUseCase } from './use-cases/get-available-slugs/get-available-slugs.use-case';
import { GetExistingPermissionUseCase } from './use-cases/get-existing-permission.use-case';
import { PostPermissionController } from './use-cases/post-permission/post-permission.controller';
import { PostPermissionUseCase } from './use-cases/post-permission/post-permission.use-case';
import { ReloadRouteManifestController } from './use-cases/reload-route-manifest/reload-route-manifest.controller';
import { ReloadRouteManifestUseCase } from './use-cases/reload-route-manifest/reload-route-manifest.use-case';

@Module({
	imports: [
		TypeOrmModule.forFeature([PermissionsEntity, PermissionsSlugsEntity, PermissionUserEntity]),
	],
	controllers: [
		GetAvailableSlugsController,
		PostPermissionController,
		GetAllPermissionController,
		ReloadRouteManifestController,
		FindOneByIdPermissionController,
		DeletePermissionController,
	],
	providers: [
		RouteDiscoveryService,
		RouteManifestService,
		PermissionsAuthorizationService,
		PermissionsGuard,
		PostPermissionUseCase,
		GetAllPermissionUseCase,
		GetExistingPermissionUseCase,
		FindOneByIdPermissionUseCase,
		GetAvailableSlugsUseCase,
		DeletePermissionUseCase,
		ReloadRouteManifestUseCase,
		{
			provide: PermissionsRepositoryAbstract,
			useClass: PermissionsRepository,
		},
		{
			provide: PermissionsSlugsRepositoryAbstract,
			useClass: PermissionsSlugsRepository,
		},
	],
	exports: [
		GetExistingPermissionUseCase,
		RouteDiscoveryService,
		RouteManifestService,
		PermissionsSlugsRepositoryAbstract,
		PermissionsAuthorizationService,
		PermissionsGuard,
	],
})
export class PermissionsModule {}
