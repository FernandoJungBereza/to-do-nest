import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { PostUserDto } from '../dtos/post-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepositoryAbstractResponse } from '../interfaces/user-repository-abstract-response';
import { UserRepositoryAbstract } from './user.repository.abstract';

@Injectable()
export class UserRepository implements UserRepositoryAbstract {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(
    criteria: FindOneOptions<UserEntity>,
  ): Promise<UserRepositoryAbstractResponse | null> {
    return await this.userRepository.findOne(criteria);
  }

  async create(postUserDto: PostUserDto): Promise<UserEntity> {
    return this.userRepository.create(postUserDto);
  }

  async save(user: UserEntity): Promise<void> {
    await this.userRepository.save(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async findAll(
    criteria: FindManyOptions<UserEntity>,
  ): Promise<UserRepositoryAbstractResponse[] | []> {
    return await this.userRepository.find(criteria);
  }

  async findUserPaginated(
    page: number,
    limit: number,
  ): Promise<UserRepositoryAbstractResponse[] | []> {
    const userQueryBuilder = this.userRepository.createQueryBuilder('user');

    userQueryBuilder.select(['user.id', 'user.name', 'user.email']);
    userQueryBuilder.skip((page - 1) * limit);
    userQueryBuilder.take(limit);

    return await userQueryBuilder.getMany();
  }
}
