import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepositoryAbstractResponse } from '../interfaces/user-repository-abstract-response';
import { UserRepositoryAbstract } from '../repositories/user.repository.abstract';

@Injectable()
export class GetExistingUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryAbstract,
  ) {}

  async execute(
    criteria: FindOneOptions<UserEntity>,
  ): Promise<UserRepositoryAbstractResponse> {
    const user = await this.userRepository.findOne(criteria);

    if (!user) {
      const where = criteria.where || [];
      const whereClause = formatWhereClause(where);

      throw new NotFoundException(
        `Usuario não encontrado com os critérios: ${whereClause}`,
      );
    }

    return user;
  }
}
