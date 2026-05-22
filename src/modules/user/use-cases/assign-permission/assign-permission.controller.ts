import { Permission } from '@/modules/permissions/constants/permission.enum';
import { RequirePermission } from '@/modules/permissions/decorators/require-permission.decorator';
import { AssignPermissionDto } from '@/modules/permissions/dtos/assign-permission.dto';
import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignPermissionUseCase } from './assign-permission.use-case';

@ApiTags('Users')
@Controller('users')
export class AssignPermissionController {
	constructor(private readonly assignPermissionUseCase: AssignPermissionUseCase) {}

	@RequirePermission(Permission.UsersPermissions)
	@Post(':id/permissions')
	@ApiOperation({ summary: 'Assign a permission to a user' })
	@ApiResponse({ status: 201, description: 'Permission assigned' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	@ApiResponse({ status: 404, description: 'User or permission not found' })
	@ApiResponse({ status: 409, description: 'Permission already assigned' })
	async assignPermission(@Param('id', ParseUUIDPipe) id: string, @Body() assignPermissionDto: AssignPermissionDto) {
		await this.assignPermissionUseCase.execute(id, assignPermissionDto.permissionId);
	}
}
