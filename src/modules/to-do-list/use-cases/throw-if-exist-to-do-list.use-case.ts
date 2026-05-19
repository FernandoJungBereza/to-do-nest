import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ToDoListEntity } from '../entities/to-do-list.entity';

@Injectable()
export class ThrowIfExistToDoListUseCase {
  constructor(
    @InjectRepository(ToDoListEntity)
    private readonly toDoListRepository: Repository<ToDoListEntity>,
  ) {}

  async execute(criteria: FindOneOptions<ToDoListEntity>) {
    const toDoList = await this.toDoListRepository.findOne(criteria);

    if (toDoList) {
      const where = criteria.where || [];
      const whereClause = formatWhereClause(where);

      throw new BadRequestException(
        `to-do list já existe para o usuário com os critérios: ${whereClause}`,
      );
    }
  }
}
