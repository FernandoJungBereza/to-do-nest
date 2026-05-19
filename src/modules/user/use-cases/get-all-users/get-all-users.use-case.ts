import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(): Promise<Pick<UserEntity, 'id' | 'name' | 'email'>[]> {
    return await this.userRepository.find({
      select: ['id', 'name', 'email'],
    });
  }
}
