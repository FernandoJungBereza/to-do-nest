import { PaginationTitleAndNameDto } from '@/shared/dtos/joins/pagination-title-and-name.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputPaginatedToDoListDto } from '../../dtos/output-paginated-to-do-list.dto';
import { GetPaginatedToDoListUseCase } from './get-paginated-to-do-list.use-case';

@ApiTags('To-do Lists')
@Controller('to-do-lists/paginated')
export class GetPaginatedToDoListController {
	constructor(private readonly getPaginatedToDoListUseCase: GetPaginatedToDoListUseCase) {}

	@Get()
	@ApiOperation({ summary: 'Get paginated to-do lists for a user' })
	@ApiResponse({ status: 200, description: 'To-do lists found', type: OutputPaginatedToDoListDto })
	@ApiResponse({ status: 404, description: 'To-do lists not found' })
	async getPaginatedToDoList(@Query() paginationTitleAndNameDto: PaginationTitleAndNameDto) {
		return await this.getPaginatedToDoListUseCase.execute(paginationTitleAndNameDto);
	}
}
