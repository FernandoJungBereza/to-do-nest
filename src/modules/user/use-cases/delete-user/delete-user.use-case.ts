import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly getExistingUserUseCase: GetExistingUserUseCase,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.getExistingUserUseCase.execute({
      where: { id: id },
    });

    await this.userRepository.delete(user.id);
  }
}
