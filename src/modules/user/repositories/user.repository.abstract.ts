import { PaginationNameAndEmailDto } from '@/shared/dtos/joins/pagination-name-and-email.dto';
import { FindOneOptions } from 'typeorm';
import { DeleteResult, UpdateResult } from 'typeorm/browser';
import { OutputPaginatedUserDto } from '../dtos/output-paginated-user.dto';
import { PostUserDto } from '../dtos/post-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepositoryAbstractResponse } from '../interfaces/user-repository-abstract-response';

export abstract class UserRepositoryAbstract {
	abstract findOne(criteria: FindOneOptions<UserEntity>): Promise<UserRepositoryAbstractResponse | null>;
	abstract save(user: UserEntity): Promise<void>;
	abstract create(postUserDto: PostUserDto): Promise<UserEntity>;
	abstract update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
	abstract delete(id: string): Promise<DeleteResult>;
	abstract findPaginated(paginationNameAndEmailDto: PaginationNameAndEmailDto): Promise<OutputPaginatedUserDto>;
	abstract softDelete(id: string): Promise<DeleteResult>;
	abstract restore(id: string): Promise<void>;
	abstract findDeletedById(criteria: FindOneOptions<UserEntity>): Promise<UserEntity[]>;
}
