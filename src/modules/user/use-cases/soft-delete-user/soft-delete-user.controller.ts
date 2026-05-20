import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SoftDeleteUserUseCase } from './soft-delete-user.use-case';

@ApiTags('Users')
@Controller('users')
export class SoftDeleteUserController {
	constructor(private readonly softDeleteUserUseCase: SoftDeleteUserUseCase) {}

	@Delete(':id/soft-delete')
	@ApiOperation({ summary: 'Soft delete a user by ID' })
	@ApiResponse({ status: 200, description: 'User soft deleted' })
	@ApiResponse({ status: 404, description: 'User not found' })
	async softDeleteUser(@Param('id', ParseUUIDPipe) id: string) {
		return await this.softDeleteUserUseCase.execute(id);
	}
}
