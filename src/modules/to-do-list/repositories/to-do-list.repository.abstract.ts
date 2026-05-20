import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  UpdateResult,
} from 'typeorm';
import { PostToDoListDto } from '../dtos/post-to-do-list.dto';
import { UpdateToDoListDto } from '../dtos/update-to-do-list.dto';
import { ToDoListEntity } from '../entities/to-do-list.entity';
import { ToDoListRepositoryAbstractResponse } from '../interfaces/to-do-list-repository-abstract-response';

export abstract class ToDoListRepositoryAbstract {
  abstract findOne(
    criteria: FindOneOptions<ToDoListEntity>,
  ): Promise<ToDoListRepositoryAbstractResponse | null>;
  abstract findAll(
    criteria: FindManyOptions<ToDoListEntity>,
  ): Promise<ToDoListRepositoryAbstractResponse[] | []>;
  abstract create(toDoListDto: PostToDoListDto): Promise<ToDoListEntity>;
  abstract update(
    id: string,
    updateToDoListDto: UpdateToDoListDto,
  ): Promise<UpdateResult>;
  abstract delete(id: string): Promise<DeleteResult>;
  abstract save(toDoList: ToDoListEntity): Promise<void>;
}
