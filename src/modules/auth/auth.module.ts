import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { AuthController } from './controller/auth.controller';
import { RegisterAuthUseCase } from './use-cases/register-auth.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [RegisterAuthUseCase],
})
export class AuthModule {}
