import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsSlugsEntity } from './entities/permissions-slugs.entity';
import { PermissionsEntity } from './entities/permissions.entity';
import { PermissionsRepository } from './repositories/permissions.repository';
import { PermissionsRepositoryAbstract } from './repositories/permissions.repository.abstratct';
import { FindOneByIdPermissionController } from './use-cases/find-one-by-id-permission/find-one-by-id-permission.controller';
import { FindOneByIdPermissionUseCase } from './use-cases/find-one-by-id-permission/find-one-by-id-permission.use-case';
import { GetAllPermissionController } from './use-cases/get-all-permissions/get-all-permission.controller';
import { GetAllPermissionUseCase } from './use-cases/get-all-permissions/get-all-permission.use-case';
import { GetExistingPermissionUseCase } from './use-cases/get-existing-permission.use-case';
import { PostPermissionController } from './use-cases/post-permission/post-permission.controller';
import { PostPermissionUseCase } from './use-cases/post-permission/post-permission.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([PermissionsEntity, PermissionsSlugsEntity])],
	controllers: [PostPermissionController, GetAllPermissionController, FindOneByIdPermissionController],
	providers: [
		PostPermissionUseCase,
		GetAllPermissionUseCase,
		GetExistingPermissionUseCase,
		FindOneByIdPermissionUseCase,
		{
			provide: PermissionsRepositoryAbstract,
			useClass: PermissionsRepository,
		},
	],
	exports: [GetExistingPermissionUseCase],
})
export class PermissionsModule {}
