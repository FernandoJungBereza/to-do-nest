import { OutputPaginatedDto } from '@/shared/dtos/output-paginated.dto';
import { PaginationSearchDto } from '@/shared/dtos/pagination-search.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputToDoListDto } from '../../dtos/output-to-do-list.dto';
import { GetPaginatedToDoListUseCase } from './get-paginated-to-do-list.use-case';

@ApiTags('To-do Lists')
@Controller('to-do-lists/paginated')
export class GetPaginatedToDoListController {
	constructor(private readonly getPaginatedToDoListUseCase: GetPaginatedToDoListUseCase) {}

	@Get()
	@ApiOperation({ summary: 'Get paginated to-do lists for a user' })
	@ApiResponse({ status: 200, description: 'To-do lists found', type: OutputPaginatedDto<OutputToDoListDto[]> })
	@ApiResponse({ status: 404, description: 'To-do lists not found' })
	async getPaginatedToDoList(@Query() paginationSearchDto: PaginationSearchDto) {
		return await this.getPaginatedToDoListUseCase.execute(paginationSearchDto);
	}
}
