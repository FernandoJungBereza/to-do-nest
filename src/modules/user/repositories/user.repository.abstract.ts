import { FindManyOptions, FindOneOptions } from 'typeorm';
import { DeleteResult, UpdateResult } from 'typeorm/browser';
import { PostUserDto } from '../dtos/post-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepositoryAbstractResponse } from '../interfaces/user-repository-abstract-response';

export abstract class UserRepositoryAbstract {
  abstract findOne(
    criteria: FindOneOptions<UserEntity>,
  ): Promise<UserRepositoryAbstractResponse | null>;
  abstract save(user: UserEntity): Promise<void>;
  abstract create(postUserDto: PostUserDto): Promise<UserEntity>;
  abstract update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult>;
  abstract delete(id: string): Promise<DeleteResult>;
  abstract findAll(
    criteria: FindManyOptions<UserEntity>,
  ): Promise<UserRepositoryAbstractResponse[] | []>;
}
