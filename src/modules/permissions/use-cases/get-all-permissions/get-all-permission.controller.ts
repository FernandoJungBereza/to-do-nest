import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputGetPermissionDto } from '../../dtos/output-get-permission.dto';
import { GetAllPermissionUseCase } from './get-all-permission.use-case';

@ApiTags('Permissions')
@Controller('permissions')
export class GetAllPermissionController {
	constructor(private readonly getAllPermissionUseCase: GetAllPermissionUseCase) {}

	@Get()
	@ApiOperation({ summary: 'Get all permissions' })
	@ApiResponse({ status: 200, description: 'Permissions found', type: [OutputGetPermissionDto] })
	@ApiResponse({ status: 404, description: 'Permissions not found' })
	async getAllPermissions() {
		return await this.getAllPermissionUseCase.execute();
	}
}
