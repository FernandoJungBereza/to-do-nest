import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OutputUserPermissionsDto } from '../../dtos/output-user-permissions.dto';
import { GetPermissionsUserIdUseCase } from './get-permissions-user-by-id.use-case';

@ApiTags('Users')
@Controller('users')
export class GetPermissionsUserIdController {
	constructor(private readonly getPermissionsUserIdUseCase: GetPermissionsUserIdUseCase) {}

	@Get(':userId/permissions')
	@ApiOperation({ summary: 'Get permissions of a user by ID' })
	@ApiResponse({ status: 200, description: 'Permissions found', type: OutputUserPermissionsDto })
	@ApiResponse({ status: 404, description: 'User not found' })
	async getPermissionsUserId(@Param('userId', ParseUUIDPipe) userId: string) {
		return await this.getPermissionsUserIdUseCase.execute(userId);
	}
}
