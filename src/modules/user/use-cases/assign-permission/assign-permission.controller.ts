import { Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignPermissionUseCase } from './assign-permission.use-case';

@ApiTags('Users')
@Controller('users')
export class AssignPermissionController {
	constructor(private readonly assignPermissionUseCase: AssignPermissionUseCase) {}

	@Post(':userId/permissions/:permissionId')
	@ApiOperation({ summary: 'Assign a permission to a user' })
	@ApiResponse({ status: 200, description: 'Permission assigned to user' })
	@ApiResponse({ status: 404, description: 'User or permission not found' })
	async assignPermission(
		@Param('userId', ParseUUIDPipe) userId: string,
		@Param('permissionId', ParseUUIDPipe) permissionId: string,
	) {
		return await this.assignPermissionUseCase.execute(userId, permissionId);
	}
}
