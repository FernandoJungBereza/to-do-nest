import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { ToDoListEntity } from '../entities/to-do-list.entity';
import { ToDoListEntityInterface } from '../interfaces/to-do-list-entity.interface';
import { ToDoListRepositoryAbstract } from '../repositories/to-do-list.repository.abstract';

@Injectable()
export class GetExistingToDoListUseCase {
	constructor(private readonly toDoListRepository: ToDoListRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<ToDoListEntity>): Promise<ToDoListEntityInterface> {
		const toDoList = await this.toDoListRepository.findOne(criteria);

		if (!toDoList) {
			const where = criteria.where || [];
			const whereClause = formatWhereClause(where);

			throw new NotFoundException(`to-do list não encontrado para o usuário com os critérios: ${whereClause}`);
		}

		return toDoList;
	}
}
