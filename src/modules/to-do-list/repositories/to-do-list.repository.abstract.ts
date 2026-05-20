import { PaginationTitleAndNameDto } from '@/shared/dtos/joins/pagination-tilte-and-name.dto';
import { DeleteResult, FindOneOptions, UpdateResult } from 'typeorm';
import { OutputPaginatedToDoListDto } from '../dtos/output-paginated-to-do-list.dto';
import { PostToDoListDto } from '../dtos/post-to-do-list.dto';
import { UpdateToDoListDto } from '../dtos/update-to-do-list.dto';
import { ToDoListEntity } from '../entities/to-do-list.entity';
import { ToDoListRepositoryAbstractResponse } from '../interfaces/to-do-list-repository-abstract-response';

export abstract class ToDoListRepositoryAbstract {
	abstract findOne(criteria: FindOneOptions<ToDoListEntity>): Promise<ToDoListRepositoryAbstractResponse | null>;
	abstract findPaginated(paginationTitleAndNameDto: PaginationTitleAndNameDto): Promise<OutputPaginatedToDoListDto>;
	abstract create(toDoListDto: PostToDoListDto): Promise<ToDoListEntity>;
	abstract update(id: string, updateToDoListDto: UpdateToDoListDto): Promise<UpdateResult>;
	abstract delete(id: string): Promise<DeleteResult>;
	abstract save(toDoList: ToDoListEntity): Promise<void>;
}
