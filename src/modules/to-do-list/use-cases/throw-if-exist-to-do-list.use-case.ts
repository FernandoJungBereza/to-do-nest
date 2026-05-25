import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { ToDoListEntity } from '../entities/to-do-list.entity';
import { ToDoListRepositoryAbstract } from '../repositories/to-do-list.repository.abstract';

@Injectable()
export class ThrowIfExistToDoListUseCase {
	constructor(private readonly toDoListRepository: ToDoListRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<ToDoListEntity>) {
		const toDoList = await this.toDoListRepository.findOne(criteria);

		if (toDoList) {
			const where = criteria.where || [];
			const whereClause = formatWhereClause(where);

			throw new BadRequestException(`to-do list já existe para este usuário com o título informado (${whereClause})`);
		}
	}
}
