import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignPermissionDto } from '@/modules/permissions/dtos/assign-permission.dto';
import { AssignPermissionUseCase } from './assign-permission.use-case';

@ApiTags('Users')
@Controller('users')
export class AssignPermissionController {
	constructor(private readonly assignPermissionUseCase: AssignPermissionUseCase) {}

	@Post(':userId/permissions')
	@ApiOperation({ summary: 'Assign a permission to a user' })
	@ApiResponse({ status: 201, description: 'Permission assigned' })
	@ApiResponse({ status: 404, description: 'User or permission not found' })
	@ApiResponse({ status: 409, description: 'Permission already assigned' })
	async assignPermission(
		@Param('userId', ParseUUIDPipe) userId: string,
		@Body() assignPermissionDto: AssignPermissionDto,
	) {
		await this.assignPermissionUseCase.execute(userId, assignPermissionDto.permissionId);
	}
}
