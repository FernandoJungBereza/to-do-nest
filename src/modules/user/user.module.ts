import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionUserModule } from '../permission-user/permission-user.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { AssignPermissionController } from './use-cases/assign-permission/assign-permission.controller';
import { AssignPermissionUseCase } from './use-cases/assign-permission/assign-permission.use-case';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserRepositoryAbstract } from './repositories/user.repository.abstract';
import { DeleteUserController } from './use-cases/delete-user/delete-user.controller';
import { DeleteUserUseCase } from './use-cases/delete-user/delete-user.use-case';
import { GetExistingDeletedUserUseCase } from './use-cases/get-existing-deleted-user.use-case';
import { GetExistingUserUseCase } from './use-cases/get-existing-user.use-case';
import { GetOneUserByIdController } from './use-cases/get-one-user-by-id/get-one-user-by-id.controller';
import { GetOneUserByIdUseCase } from './use-cases/get-one-user-by-id/get-one-user-by-id.use-case';
import { GetPaginatedUserController } from './use-cases/get-paginated-users/get-paginated-users.controller';
import { GetPaginatedUsersUseCase } from './use-cases/get-paginated-users/get-paginated-users.use-case';
import { GetPermissionsUserIdController } from './use-cases/get-permissions-user-by-id/get-permissions-user-by-id.controller';
import { GetPermissionsUserIdUseCase } from './use-cases/get-permissions-user-by-id/get-permissions-user-by-id.use-case';
import { PostUserController } from './use-cases/post-user/post-user.controller';
import { PostUserUseCase } from './use-cases/post-user/post-user.use-case';
import { RestoreUserController } from './use-cases/restore-user/restore-user.controller';
import { RestoreUserUseCase } from './use-cases/restore-user/restore-user.use-case';
import { SoftDeleteUserController } from './use-cases/soft-delete-user/soft-delete-user.controller';
import { SoftDeleteUserUseCase } from './use-cases/soft-delete-user/soft-delete-user.use-case';
import { ThrowIfExistUserUseCase } from './use-cases/throw-if-exist-user.use-case';
import { UpdateUserController } from './use-cases/update-user/update-user.controller';
import { UpdateUserUseCase } from './use-cases/update-user/update-user.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), PermissionUserModule, PermissionsModule],
	controllers: [
		RestoreUserController,
		DeleteUserController,
		GetPaginatedUserController,
		GetOneUserByIdController,
		PostUserController,
		UpdateUserController,
		SoftDeleteUserController,
		GetPermissionsUserIdController,
		AssignPermissionController,
	],
	providers: [
		RestoreUserUseCase,
		GetExistingDeletedUserUseCase,
		SoftDeleteUserUseCase,
		PostUserUseCase,
		UpdateUserUseCase,
		ThrowIfExistUserUseCase,
		GetOneUserByIdUseCase,
		GetExistingUserUseCase,
		GetPaginatedUsersUseCase,
		DeleteUserUseCase,
		GetPermissionsUserIdUseCase,
		AssignPermissionUseCase,
		{
			provide: UserRepositoryAbstract,
			useClass: UserRepository,
		},
	],
	exports: [GetOneUserByIdUseCase, UserRepositoryAbstract],
})
export class UserModule {}
