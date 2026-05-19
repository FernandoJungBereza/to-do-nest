import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostToDoListDto } from '../../dtos/post-to-do-list.dto';
import { ToDoListEntity } from '../../entities/to-do-list.entity';
import { ThrowIfExistToDoListUseCase } from '../throw-if-exist-to-do-list.use-case';

@Injectable()
export class PostToDoListUseCase {
  constructor(
    private readonly toDoListRepository: Repository<ToDoListEntity>,
    private readonly throwIfExistToDoListUseCase: ThrowIfExistToDoListUseCase,
  ) {}

  async execute(postToDoListDto: PostToDoListDto): Promise<void> {
    await this.throwIfExistToDoListUseCase.execute({
      where: {
        userId: postToDoListDto.userId,
      },
    });

    const toDoList = this.toDoListRepository.create({
      ...postToDoListDto,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    await this.toDoListRepository.save(toDoList);
  }
}
