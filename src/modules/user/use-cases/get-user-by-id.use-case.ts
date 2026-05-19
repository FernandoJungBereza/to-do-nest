import { Injectable } from '@nestjs/common';
import { RegisterUserResponseDto } from '../dtos/register-user-response.dto';
import { GetExistingUserUseCase } from './get-existing-user.use-case';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    private readonly getExistingUserUseCase: GetExistingUserUseCase,
  ) {}

  async execute(id: string): Promise<RegisterUserResponseDto> {
    const user = await this.getExistingUserUseCase.execute({
      where: { id: id },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
