import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ToDoListEntity } from '../entities/to-do-list.entity';
import { ToDoListEntityInterface } from '../interfaces/to-do-list-entity.interface';

@Injectable()
export class GetExistingToDoListUseCase {
  constructor(
    @InjectRepository(ToDoListEntity)
    private readonly toDoListRepository: Repository<ToDoListEntity>,
  ) {}

  async execute(
    criteria: FindOneOptions<ToDoListEntity>,
  ): Promise<ToDoListEntityInterface | null> {
    const toDoList = await this.toDoListRepository.findOne(criteria);

    if (!toDoList) {
      const where = criteria.where || [];
      const whereClause = formatWhereClause(where);

      throw new NotFoundException(
        `to-do list não encontrado para o usuário com os critérios: ${whereClause}`,
      );
    }

    return toDoList;
  }
}
