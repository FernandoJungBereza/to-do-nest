import { AssignPermissionDto } from '@/modules/permissions/dtos/assign-permission.dto';
import type { AuthenticatedRequest } from '@/modules/auth/interfaces/authenticated-request.interface';
import { Body, Controller, Param, ParseUUIDPipe, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignPermissionUseCase } from './assign-permission.use-case';

@ApiTags('Users')
@Controller('users')
export class AssignPermissionController {
	constructor(private readonly assignPermissionUseCase: AssignPermissionUseCase) {}

	@Post(':userId/permissions')
	@ApiOperation({ summary: 'Assign a permission to a user (admin only)' })
	@ApiResponse({ status: 201, description: 'Permission assigned' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	@ApiResponse({ status: 404, description: 'User or permission not found' })
	@ApiResponse({ status: 409, description: 'Permission already assigned' })
	async assignPermission(
		@Req() request: AuthenticatedRequest,
		@Param('userId', ParseUUIDPipe) userId: string,
		@Body() assignPermissionDto: AssignPermissionDto,
	) {
		await this.assignPermissionUseCase.execute(
			request.user.userId,
			userId,
			assignPermissionDto.permissionId,
		);
	}
}
