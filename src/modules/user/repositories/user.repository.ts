import { PaginationNameAndEmailDto } from '@/shared/dtos/joins/pagination-name-and-email.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { OutputPaginatedUserDto } from '../dtos/output-paginated-user.dto';
import { OutputUserPermissionsDto } from '../dtos/output-user-permissions.dto';
import { OutputUserDto } from '../dtos/output-user.dto';
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

	async findOne(criteria: FindOneOptions<UserEntity>): Promise<UserRepositoryAbstractResponse | null> {
		return await this.userRepository.findOne(criteria);
	}

	async create(postUserDto: PostUserDto): Promise<UserEntity> {
		return this.userRepository.create(postUserDto);
	}

	async save(user: UserEntity): Promise<void> {
		await this.userRepository.save(user);
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
		return await this.userRepository.update(id, updateUserDto);
	}

	async delete(id: string): Promise<DeleteResult> {
		return await this.userRepository.delete(id);
	}

	async softDelete(id: string): Promise<DeleteResult> {
		return await this.userRepository.softDelete(id);
	}

	async restore(id: string): Promise<void> {
		await this.userRepository.restore(id);
	}

	async findDeletedById(criteria: FindOneOptions<UserEntity>): Promise<UserEntity[]> {
		return await this.userRepository.find({
			where: criteria.where,
			withDeleted: true,
		});
	}

	async findPaginated(paginationNameAndEmailDto: PaginationNameAndEmailDto): Promise<OutputPaginatedUserDto> {
		const userQueryBuilder = this.userRepository.createQueryBuilder('user');
		userQueryBuilder.select(['user.id', 'user.name', 'user.email', 'user.createdAt', 'user.updatedAt']);

		userQueryBuilder.skip((paginationNameAndEmailDto.page - 1) * paginationNameAndEmailDto.quantity);
		userQueryBuilder.take(paginationNameAndEmailDto.quantity);

		if (paginationNameAndEmailDto.name && paginationNameAndEmailDto.email) {
			userQueryBuilder.where('user.name ILIKE :name AND user.email ILIKE :email', {
				name: `%${paginationNameAndEmailDto.name}%`,
				email: `%${paginationNameAndEmailDto.email}%`,
			});
		} else if (paginationNameAndEmailDto.name) {
			userQueryBuilder.where('user.name ILIKE :name', { name: `%${paginationNameAndEmailDto.name}%` });
		} else if (paginationNameAndEmailDto.email) {
			userQueryBuilder.where('user.email ILIKE :email', { email: `%${paginationNameAndEmailDto.email}%` });
		}

		const [users, totalItems] = await userQueryBuilder.getManyAndCount();
		const data: OutputUserDto[] = users.map((user) => ({
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		}));

		return new OutputPaginatedUserDto({
			data,
			currentPage: paginationNameAndEmailDto.page,
			totalPages: Math.ceil(totalItems / paginationNameAndEmailDto.quantity),
			totalItems,
			itemsPerPage: paginationNameAndEmailDto.quantity,
		});
	}

	async assignPermission(userId: string, permissionId: string): Promise<void> {
		await this.userRepository
			.createQueryBuilder('user')
			.leftJoinAndSelect('user.permissions', 'permission')
			.where('user.id = :userId', { userId })
			.andWhere('permission.id = :permissionId', { permissionId })
			.execute();
	}

	async getPermissionsUserId(userId: string): Promise<OutputUserPermissionsDto> {
		const user = await this.userRepository
			.createQueryBuilder('user')
			.leftJoinAndSelect('user.permissionUsers', 'permissionUser')
			.leftJoinAndSelect('permissionUser.permission', 'permission')
			.where('user.id = :userId', { userId })
			.getOneOrFail();

		return {
			id: user.id,
			name: user.name,
			permissions: user.permissionUsers.map((permissionUser) => ({
				id: permissionUser.permission.id,
				name: permissionUser.permission.name,
				description: permissionUser.permission.description,
				permissionSlug: permissionUser.permission.permissionSlug,
			})),
		};
	}
}
