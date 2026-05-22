import { Permission } from '@/modules/permissions/constants/permission.enum';
import { RequirePermission } from '@/modules/permissions/decorators/require-permission.decorator';
import { PaginationNameAndEmailDto } from '@/shared/dtos/joins/pagination-name-and-email.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPaginatedUsersUseCase } from './get-paginated-users.use-case';
import { OutputPaginatedUserDto } from '../../dtos/output-paginated-user.dto';

@ApiTags('Users')
@Controller('users/paginated')
export class GetPaginatedUserController {
	constructor(private readonly getPaginatedUserUseCase: GetPaginatedUsersUseCase) {}

	@RequirePermission(Permission.UsersList)
	@Get()
	@ApiOperation({ summary: 'Get paginated users' })
	@ApiResponse({ status: 200, description: 'Users found', type: OutputPaginatedUserDto })
	@ApiResponse({ status: 404, description: 'Users not found' })
	async getAllUsers(@Query() paginationNameAndEmailDto: PaginationNameAndEmailDto) {
		return await this.getPaginatedUserUseCase.execute(paginationNameAndEmailDto);
	}
}
