import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateToDoListDto } from '../../dtos/update-to-do-list.dto';
import { ToDoListEntity } from '../../entities/to-do-list.entity';
import { GetExistingToDoListUseCase } from '../get-existing-to-do-list.use-case';

@Injectable()
export class UpdateToDoListUseCase {
  constructor(
    @InjectRepository(ToDoListEntity)
    private readonly toDoListRepository: Repository<ToDoListEntity>,
    private readonly getExistingToDoListUseCase: GetExistingToDoListUseCase,
  ) {}

  async execute(
    id: string,
    updateToDoListDto: UpdateToDoListDto,
  ): Promise<void> {
    const toDoList = await this.getExistingToDoListUseCase.execute({
      where: { id },
    });

    await this.toDoListRepository.update(toDoList.id, {
      ...updateToDoListDto,
      updatedAt: new Date(),
    });
  }
}
