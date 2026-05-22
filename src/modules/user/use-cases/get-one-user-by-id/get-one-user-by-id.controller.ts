import { Permission } from '@/modules/permissions/constants/permission.enum';
import { RequirePermission } from '@/modules/permissions/decorators/require-permission.decorator';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetOneUserByIdUseCase } from './get-one-user-by-id.use-case';
import { OutputUserDto } from '../../dtos/output-user.dto';

@ApiTags('Users')
@Controller('users')
export class GetOneUserByIdController {
	constructor(private readonly getOneUserByIdUseCase: GetOneUserByIdUseCase) {}

	@RequirePermission(Permission.UserFind)
	@Get(':id')
	@ApiOperation({ summary: 'Get a user by ID' })
	@ApiResponse({ status: 200, description: 'User found' })
	@ApiResponse({ status: 404, description: 'User not found', type: OutputUserDto })
	async getOneUserById(@Param('id', ParseUUIDPipe) id: string) {
		return await this.getOneUserByIdUseCase.execute(id);
	}
}
