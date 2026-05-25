import type { AuthenticatedRequest } from '@/modules/auth/interfaces/authenticated-request.interface';
import { Permission } from '@/modules/permissions/constants/permission.enum';
import { RequirePermission } from '@/modules/permissions/decorators/require-permission.decorator';
import { PaginationTitleDto } from '@/shared/dtos/joins/pagination-title.dto';
import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputPaginatedToDoListDto } from '../../dtos/output-paginated-to-do-list.dto';
import { GetPaginatedToDoListByCurrentUserUseCase } from './get-paginated-to-do-list-by-current-user.use-case';

@ApiTags('To-do Lists')
@Controller('to-do-lists/me')
export class GetPaginatedToDoListByCurrentUserController {
	constructor(
		private readonly getPaginatedToDoListByCurrentUserUseCase: GetPaginatedToDoListByCurrentUserUseCase,
	) {}

	@RequirePermission(Permission.TodosRead)
	@Get()
	@ApiOperation({ summary: 'Get paginated to-do lists for the current user' })
	@ApiResponse({ status: 200, description: 'To-do lists found', type: OutputPaginatedToDoListDto })
	async getPaginatedToDoListByCurrentUser(
		@Req() req: AuthenticatedRequest,
		@Query() paginationTitleDto: PaginationTitleDto,
	) {
		return await this.getPaginatedToDoListByCurrentUserUseCase.execute(req.user.userId, paginationTitleDto);
	}
}
