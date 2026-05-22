import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteUserUseCase } from './delete-user.use-case';

@ApiTags('Users')
@Controller('users')
export class DeleteUserController {
	constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a user by ID' })
	@ApiResponse({ status: 200, description: 'User deleted' })
	@ApiResponse({ status: 404, description: 'User not found' })
	async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
		return await this.deleteUserUseCase.execute(id);
	}
}
