import { Injectable } from '@nestjs/common';
import { ToDoListRepositoryAbstractResponse } from '../../interfaces/to-do-list-repository-abstract-response';
import { ToDoListRepositoryAbstract } from '../../repositories/to-do-list.repository.abstract';

@Injectable()
export class GetAllToDoListUseCase {
  constructor(
    private readonly toDoListRepository: ToDoListRepositoryAbstract,
  ) {}
  async execute(): Promise<ToDoListRepositoryAbstractResponse[]> {
    return await this.toDoListRepository.findAll({});
  }
}
