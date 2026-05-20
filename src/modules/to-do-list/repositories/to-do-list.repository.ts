import { PaginationTitleAndNameDto } from '@/shared/dtos/joins/pagination-tilte-and-name.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { OutputPaginatedToDoListDto } from '../dtos/output-paginated-to-do-list.dto';
import { OutputToDoListDto } from '../dtos/output-to-do-list.dto';
import { PostToDoListDto } from '../dtos/post-to-do-list.dto';
import { UpdateToDoListDto } from '../dtos/update-to-do-list.dto';
import { ToDoListEntity } from '../entities/to-do-list.entity';
import { ToDoListRepositoryAbstractResponse } from '../interfaces/to-do-list-repository-abstract-response';
import { ToDoListRepositoryAbstract } from './to-do-list.repository.abstract';

@Injectable()
export class ToDoListRepository implements ToDoListRepositoryAbstract {
	constructor(
		@InjectRepository(ToDoListEntity)
		private readonly toDoListRepository: Repository<ToDoListEntity>,
	) {}

	async findOne(criteria: FindOneOptions<ToDoListEntity>): Promise<ToDoListRepositoryAbstractResponse | null> {
		return await this.toDoListRepository.findOne(criteria);
	}

	async findPaginated(paginationTitleAndNameDto: PaginationTitleAndNameDto): Promise<OutputPaginatedToDoListDto> {
		const toDoListQueryBuilder = this.toDoListRepository.createQueryBuilder('toDoList');
		toDoListQueryBuilder.leftJoinAndSelect('toDoList.user', 'user');
		toDoListQueryBuilder.select([
			'toDoList.id',
			'toDoList.title',
			'toDoList.description',
			'toDoList.completed',
			'toDoList.userId',
			'toDoList.createdAt',
			'toDoList.updatedAt',
			'user.name',
			'user.email',
		]);

		toDoListQueryBuilder.skip((paginationTitleAndNameDto.page - 1) * paginationTitleAndNameDto.quantity);
		toDoListQueryBuilder.take(paginationTitleAndNameDto.quantity);

		if (paginationTitleAndNameDto.title && paginationTitleAndNameDto.name) {
			toDoListQueryBuilder.where('toDoList.title ILIKE :title AND user.name ILIKE :name', {
				title: `%${paginationTitleAndNameDto.title}%`,
				name: `%${paginationTitleAndNameDto.name}%`,
			});
		} else if (paginationTitleAndNameDto.name) {
			toDoListQueryBuilder.where('user.name ILIKE :name', {
				name: `%${paginationTitleAndNameDto.name}%`,
			});
		} else if (paginationTitleAndNameDto.title) {
			toDoListQueryBuilder.where('toDoList.title ILIKE :title', {
				title: `%${paginationTitleAndNameDto.title}%`,
			});
		}

		const [toDoLists, totalItems] = await toDoListQueryBuilder.getManyAndCount();
		const data: OutputToDoListDto[] = toDoLists.map((toDoList) => ({
			id: toDoList.id,
			title: toDoList.title,
			description: toDoList.description,
			completed: toDoList.completed,
			userId: toDoList.userId,
			createdAt: toDoList.createdAt,
			updatedAt: toDoList.updatedAt,
			user: {
				name: toDoList.user.name,
				email: toDoList.user.email,
			},
		}));

		return new OutputPaginatedToDoListDto({
			data,
			currentPage: paginationTitleAndNameDto.page,
			totalPages: Math.ceil(totalItems / paginationTitleAndNameDto.quantity),
			totalItems,
			itemsPerPage: paginationTitleAndNameDto.quantity,
		});
	}

	async create(toDoListDto: PostToDoListDto): Promise<ToDoListEntity> {
		return this.toDoListRepository.create(toDoListDto);
	}

	async update(id: string, updateToDoListDto: UpdateToDoListDto): Promise<UpdateResult> {
		return await this.toDoListRepository.update(id, updateToDoListDto);
	}

	async delete(id: string): Promise<DeleteResult> {
		return await this.toDoListRepository.delete(id);
	}

	async save(toDoList: ToDoListEntity): Promise<void> {
		await this.toDoListRepository.save(toDoList);
	}
}
