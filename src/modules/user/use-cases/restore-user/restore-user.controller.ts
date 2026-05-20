import { Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RestoreUserUseCase } from './restore-user.use-case';

@ApiTags('Users')
@Controller('users')
export class RestoreUserController {
	constructor(private readonly restoreUserUseCase: RestoreUserUseCase) {}

	@Post(':id/restore/deleted')
	@ApiOperation({ summary: 'Restore a user by ID' })
	@ApiResponse({ status: 200, description: 'User restored' })
	@ApiResponse({ status: 404, description: 'User not found' })
	@ApiResponse({ status: 400, description: 'Invalid UUID' })
	async restoreUser(@Param('id', ParseUUIDPipe) id: string) {
		return await this.restoreUserUseCase.execute(id);
	}
}
