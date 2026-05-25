import { PaginationTitleDto } from '@/shared/dtos/joins/pagination-title.dto';
import { Injectable } from '@nestjs/common';
import { OutputPaginatedToDoListDto } from '../../dtos/output-paginated-to-do-list.dto';
import { ToDoListRepositoryAbstract } from '../../repositories/to-do-list.repository.abstract';

@Injectable()
export class GetPaginatedToDoListByCurrentUserUseCase {
	constructor(private readonly toDoListRepository: ToDoListRepositoryAbstract) {}

	async execute(userId: string, paginationTitleDto: PaginationTitleDto): Promise<OutputPaginatedToDoListDto> {
		return await this.toDoListRepository.findPaginatedByUserId(userId, paginationTitleDto);
	}
}
