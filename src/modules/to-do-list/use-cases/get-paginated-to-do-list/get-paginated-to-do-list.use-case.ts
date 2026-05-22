import { PaginationTitleAndNameDto } from '@/shared/dtos/joins/pagination-title-and-name.dto';
import { Injectable } from '@nestjs/common';
import { ToDoListRepositoryAbstract } from '../../repositories/to-do-list.repository.abstract';
import { OutputPaginatedToDoListDto } from '../../dtos/output-paginated-to-do-list.dto';

@Injectable()
export class GetPaginatedToDoListUseCase {
	constructor(private readonly toDoListRepository: ToDoListRepositoryAbstract) {}
	async execute(paginationSearchDto: PaginationTitleAndNameDto): Promise<OutputPaginatedToDoListDto> {
		return await this.toDoListRepository.findPaginated(paginationSearchDto);
	}
}
