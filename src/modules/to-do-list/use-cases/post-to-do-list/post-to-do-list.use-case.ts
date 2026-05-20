import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostToDoListDto } from '../../dtos/post-to-do-list.dto';
import { ToDoListEntity } from '../../entities/to-do-list.entity';
import { ThrowIfExistToDoListUseCase } from '../throw-if-exist-to-do-list.use-case';

@Injectable()
export class PostToDoListUseCase {
  constructor(
    @InjectRepository(ToDoListEntity)
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
    });
    await this.toDoListRepository.save(toDoList);
  }
}
