import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class ThrowIfExistUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(criteria: FindOneOptions<UserEntity>) {
    const user = await this.userRepository.findOne(criteria);

    if (user) {
      const where = criteria.where || [];
      const whereClause = formatWhereClause(where);

      throw new BadRequestException(
        `Usuario já existe com os critérios: ${whereClause}`,
      );
    }
  }
}
