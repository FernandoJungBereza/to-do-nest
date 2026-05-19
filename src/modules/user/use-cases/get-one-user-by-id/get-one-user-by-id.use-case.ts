import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class GetOneUserByIdUseCase {
  constructor(
    private readonly getExistingUserUseCase: GetExistingUserUseCase,
  ) {}

  async execute(
    id: string,
  ): Promise<Pick<UserEntity, 'id' | 'name' | 'email'>> {
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
