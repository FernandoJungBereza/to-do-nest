import { Permission } from '@/modules/permissions/constants/permission.enum';
import { RequirePermission } from '@/modules/permissions/decorators/require-permission.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostPermissionDto } from '../../dtos/post-permission.dto';
import { PostPermissionUseCase } from './post-permission.use-case';

@ApiTags('Permissions')
@Controller('permissions')
export class PostPermissionController {
	constructor(private readonly postPermissionUseCase: PostPermissionUseCase) {}

	@RequirePermission(Permission.PermissionsCreate)
	@Post()
	@ApiOperation({ summary: 'Create a new permission' })
	@ApiResponse({ status: 201, description: 'Permission created' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	async postPermission(@Body() postPermissionDto: PostPermissionDto) {
		return await this.postPermissionUseCase.execute(postPermissionDto);
	}
}
