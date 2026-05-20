import { Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryAbstract,
    private readonly getExistingUserUseCase: GetExistingUserUseCase,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.getExistingUserUseCase.execute({
      where: { id: id },
    });

    await this.userRepository.delete(user.id);
  }
}
