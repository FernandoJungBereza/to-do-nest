import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDoListEntity } from '../../entities/to-do-list.entity';
import { ToDoListEntityInterface } from '../../interfaces/to-do-list-entity.interface';

@Injectable()
export class GetAllToDoListUseCase {
  constructor(
    @InjectRepository(ToDoListEntity)
    private readonly toDoListRepository: Repository<ToDoListEntity>,
  ) {}
  async execute(): Promise<ToDoListEntityInterface[]> {
    return await this.toDoListRepository.find({
      select: [
        'userId',
        'title',
        'description',
        'completed',
        'createdAt',
        'updatedAt',
      ],
    });
  }
}
