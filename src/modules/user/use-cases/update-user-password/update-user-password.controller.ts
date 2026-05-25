import { Permission } from '@/modules/permissions/constants/permission.enum';
import { RequirePermission } from '@/modules/permissions/decorators/require-permission.decorator';
import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserPasswordDto } from '../../dtos/update-user-password.dto';
import { UpdateUserPasswordUseCase } from './update-user-password.use-case';

@ApiTags('Users')
@Controller('users')
export class UpdateUserPasswordController {
	constructor(private readonly updateUserPasswordUseCase: UpdateUserPasswordUseCase) {}

	@RequirePermission(Permission.UsersUpdate)
	@Patch(':id/password')
	@ApiOperation({ summary: 'Update a user password by ID' })
	@ApiResponse({ status: 200, description: 'User password updated' })
	@ApiResponse({ status: 401, description: 'Old password is incorrect' })
	@ApiResponse({ status: 404, description: 'User not found' })
	async updateUserPassword(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateUserPasswordDto: UpdateUserPasswordDto,
	) {
		return await this.updateUserPasswordUseCase.execute(id, updateUserPasswordDto);
	}
}
