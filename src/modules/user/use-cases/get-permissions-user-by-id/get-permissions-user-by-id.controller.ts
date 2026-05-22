import { Permission } from '@/modules/permissions/constants/permission.enum';
import { RequirePermission } from '@/modules/permissions/decorators/require-permission.decorator';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputUserPermissionsDto } from '../../dtos/output-user-permissions.dto';
import { GetPermissionsUserIdUseCase } from './get-permissions-user-by-id.use-case';

@ApiTags('Users')
@Controller('users')
export class GetPermissionsUserIdController {
	constructor(private readonly getPermissionsUserIdUseCase: GetPermissionsUserIdUseCase) {}

	@RequirePermission(Permission.UserFindPermission)
	@Get(':id/permissions')
	@ApiOperation({ summary: 'Get permissions of a user by ID' })
	@ApiResponse({ status: 200, description: 'Permissions found', type: OutputUserPermissionsDto })
	@ApiResponse({ status: 404, description: 'User not found' })
	async getPermissionsUserId(@Param('id', ParseUUIDPipe) id: string) {
		return await this.getPermissionsUserIdUseCase.execute(id);
	}
}
