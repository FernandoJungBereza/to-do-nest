import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserRepositoryAbstract } from './repositories/user.repository.abstract';
import { DeleteUserController } from './use-cases/delete-user/delete-user.controller';
import { DeleteUserUseCase } from './use-cases/delete-user/delete-user.use-case';
import { GetAllUserController } from './use-cases/get-all-users/get-all-users.controller';
import { GetAllUsersUseCase } from './use-cases/get-all-users/get-all-users.use-case';
import { GetExistingUserUseCase } from './use-cases/get-existing-user.use-case';
import { GetOneUserByIdController } from './use-cases/get-one-user-by-id/get-one-user-by-id.controller';
import { GetOneUserByIdUseCase } from './use-cases/get-one-user-by-id/get-one-user-by-id.use-case';
import { PostUserController } from './use-cases/post-user/post-user.controller';
import { PostUserUseCase } from './use-cases/post-user/post-user.use-case';
import { ThrowIfExistUserUseCase } from './use-cases/throw-if-exist-user.use-case';
import { UpdateUserController } from './use-cases/update-user/update-user.controller';
import { UpdateUserUseCase } from './use-cases/update-user/update-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [
    DeleteUserController,
    GetOneUserByIdController,
    GetAllUserController,
    PostUserController,
    UpdateUserController,
  ],
  providers: [
    PostUserUseCase,
    UpdateUserUseCase,
    ThrowIfExistUserUseCase,
    GetOneUserByIdUseCase,
    GetExistingUserUseCase,
    UpdateUserUseCase,
    GetAllUsersUseCase,
    DeleteUserUseCase,
    {
      provide: UserRepositoryAbstract,
      useClass: UserRepository,
    },
  ],
  exports: [GetOneUserByIdUseCase],
})
export class UserModule {}
