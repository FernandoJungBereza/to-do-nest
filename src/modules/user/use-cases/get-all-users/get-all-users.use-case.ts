import { Injectable } from '@nestjs/common';
import { UserRepositoryAbstractResponse } from '../../interfaces/user-repository-abstract-response';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryAbstract) {}

  async execute(): Promise<
    Pick<UserRepositoryAbstractResponse, 'id' | 'name' | 'email'>[]
  > {
    return await this.userRepository.findAll({
      select: ['id', 'name', 'email'],
    });
  }
}
