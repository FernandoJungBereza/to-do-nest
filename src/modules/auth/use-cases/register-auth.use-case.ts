import { RegisterUserDto } from '@/modules/user/dtos/register-user.dto';
import { RegisterUserUseCase } from '@/modules/user/use-cases/register-user.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterAuthUseCase {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  async execute(registerUserDto: RegisterUserDto) {
    return await this.registerUserUseCase.execute(registerUserDto);
  }
}
