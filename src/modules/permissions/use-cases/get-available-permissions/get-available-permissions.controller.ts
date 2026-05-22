import { Permission } from '@/modules/permissions/constants/permission.enum';
import { RequirePermission } from '@/modules/permissions/decorators/require-permission.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputAvailablePermissionsDto } from '../../dtos/output-available-permission.dto';
import { GetAvailablePermissionsUseCase } from './get-available-permissions.use-case';

@ApiTags('Permissions')
@Controller('permissions')
export class GetAvailablePermissionsController {
	constructor(private readonly getAvailablePermissionsUseCase: GetAvailablePermissionsUseCase) {}

	@RequirePermission(Permission.PermissionsAvailable)
	@Get('available')
	@ApiOperation({ summary: 'Catalog of permission names (enum) to register via POST /permissions' })
	@ApiResponse({ status: 200, description: 'Permission catalog', type: OutputAvailablePermissionsDto })
	async getAvailablePermissions() {
		return await this.getAvailablePermissionsUseCase.execute();
	}
}
