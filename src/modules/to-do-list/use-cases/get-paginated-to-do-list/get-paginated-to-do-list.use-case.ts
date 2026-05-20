import { OutputPaginatedDto } from '@/shared/dtos/generics/output-paginated.dto';
import { PaginationSearchDto } from '@/shared/dtos/joins/pagination-search.dto';
import { Injectable } from '@nestjs/common';
import { OutputToDoListDto } from '../../dtos/output-to-do-list.dto';
import { ToDoListRepositoryAbstract } from '../../repositories/to-do-list.repository.abstract';

@Injectable()
export class GetPaginatedToDoListUseCase {
	constructor(private readonly toDoListRepository: ToDoListRepositoryAbstract) {}
	async execute(paginationSearchDto: PaginationSearchDto): Promise<OutputPaginatedDto<OutputToDoListDto>> {
		return await this.toDoListRepository.findPaginated(paginationSearchDto);
	}
}
