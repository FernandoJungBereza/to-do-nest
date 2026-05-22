import { Permission } from '@/modules/permissions/constants/permission.enum';
import { RequirePermission } from '@/modules/permissions/decorators/require-permission.decorator';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputGetPermissionDto } from '../../dtos/output-get-permission.dto';
import { FindOneByIdPermissionUseCase } from './find-one-by-id-permission.use-case';

@ApiTags('Permissions')
@Controller('permissions')
export class FindOneByIdPermissionController {
	constructor(private readonly findOneByIdPermissionUseCase: FindOneByIdPermissionUseCase) {}

	@RequirePermission(Permission.PermissionsRead)
	@Get(':id')
	@ApiOperation({ summary: 'Get a permission by ID' })
	@ApiResponse({ status: 200, description: 'Permission found', type: OutputGetPermissionDto })
	@ApiResponse({ status: 404, description: 'Permission not found' })
	async findOneByIdPermission(@Param('id', ParseUUIDPipe) id: string) {
		return await this.findOneByIdPermissionUseCase.execute(id);
	}
}
