import { OutputPaginatedDto } from '@/shared/dtos/generics/output-paginated.dto';

import { PaginationTitleAndNameDto } from '@/shared/dtos/joins/pagination-tilte-and-name.dto';
import { Injectable } from '@nestjs/common';
import { OutputToDoListDto } from '../../dtos/output-to-do-list.dto';
import { ToDoListRepositoryAbstract } from '../../repositories/to-do-list.repository.abstract';

@Injectable()
export class GetPaginatedToDoListUseCase {
	constructor(private readonly toDoListRepository: ToDoListRepositoryAbstract) {}
	async execute(paginationSearchDto: PaginationTitleAndNameDto): Promise<OutputPaginatedDto<OutputToDoListDto>> {
		return await this.toDoListRepository.findPaginated(paginationSearchDto);
	}
}
