import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputGetPermissionDto } from '../../dtos/output-get-permission.dto';
import { PostPermissionDto } from '../../dtos/post-permission.dto';
import { PostPermissionUseCase } from './post-permission.use-case';

@ApiTags('Permissions')
@Controller('permissions')
export class PostPermissionController {
	constructor(private readonly postPermissionUseCase: PostPermissionUseCase) {}

	@Post()
	@ApiOperation({ summary: 'Create a new permission' })
	@ApiResponse({ status: 201, description: 'Permission created', type: OutputGetPermissionDto })
	@ApiResponse({ status: 400, description: 'Bad request' })
	async postPermission(@Body() postPermissionDto: PostPermissionDto) {
		return await this.postPermissionUseCase.execute(postPermissionDto);
	}
}
