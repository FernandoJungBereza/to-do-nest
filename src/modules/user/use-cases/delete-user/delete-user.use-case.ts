import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
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
