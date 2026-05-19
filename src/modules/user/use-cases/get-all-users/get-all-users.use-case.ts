import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../../entities/user.entity';
import { UserRepositoryAbstractResponse } from '../../interfaces/user-repository-abstract-response';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepositoryAbstract,
  ) {}

  async execute(): Promise<
    Pick<UserRepositoryAbstractResponse, 'id' | 'name' | 'email'>[]
  > {
    return await this.userRepository.findAll({
      select: ['id', 'name', 'email'],
    });
  }
}
