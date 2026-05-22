import { Permission } from '@/modules/permissions/constants/permission.enum';
import { RequirePermission } from '@/modules/permissions/decorators/require-permission.decorator';
import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeletePermissionUseCase } from './delete-permission.use-case';

@ApiTags('Permissions')
@Controller('permissions')
export class DeletePermissionController {
	constructor(private readonly deletePermissionUseCase: DeletePermissionUseCase) {}

	@RequirePermission(Permission.PermissionsDelete)
	@Delete(':id')
	@ApiOperation({ summary: 'Delete a permission by ID' })
	@ApiResponse({ status: 200, description: 'Permission deleted' })
	@ApiResponse({ status: 404, description: 'Permission not found' })
	async deletePermission(@Param('id', ParseUUIDPipe) id: string) {
		await this.deletePermissionUseCase.execute(id);
	}
}
