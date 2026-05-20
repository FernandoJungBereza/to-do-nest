import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
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

  async findOne(
    criteria: FindOneOptions<ToDoListEntity>,
  ): Promise<ToDoListRepositoryAbstractResponse | null> {
    return await this.toDoListRepository.findOne(criteria);
  }

  async findAll(
    criteria: FindManyOptions<ToDoListEntity>,
  ): Promise<ToDoListRepositoryAbstractResponse[] | []> {
    return await this.toDoListRepository
      .createQueryBuilder('toDoList')
      .select([
        'toDoList.id',
        'toDoList.title',
        'toDoList.description',
        'toDoList.completed',
        'toDoList.userId',
        'toDoList.createdAt',
        'toDoList.updatedAt',
        'user.id',
        'user.name',
        'user.email',
        'user.password',
      ])
      .where(criteria)
      .getMany();
  }

  async create(toDoListDto: PostToDoListDto): Promise<ToDoListEntity> {
    return this.toDoListRepository.create(toDoListDto);
  }

  async update(
    id: string,
    updateToDoListDto: UpdateToDoListDto,
  ): Promise<UpdateResult> {
    return await this.toDoListRepository.update(id, updateToDoListDto);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.toDoListRepository.delete(id);
  }

  async save(toDoList: ToDoListEntity): Promise<void> {
    await this.toDoListRepository.save(toDoList);
  }
}
