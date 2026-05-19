import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities/user.entity';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { GetExistingUserUseCase } from './use-cases/get-existing-user.use-case';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { RegisterUserUseCase } from './use-cases/register-user.use-case';
import { ThrowIfExistUserUseCase } from './use-cases/throw-if-exist-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    RegisterUserUseCase,
    ThrowIfExistUserUseCase,
    GetUserByIdUseCase,
    GetExistingUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
  ],
  exports: [RegisterUserUseCase],
})
export class UserModule {}
