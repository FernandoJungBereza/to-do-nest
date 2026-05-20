import { PaginationNameAndEmailDto } from '@/shared/dtos/joins/pagination-name-and-email.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllUsersUseCase } from './get-all-users.use-case';

@ApiTags('Users')
@Controller('users')
export class GetAllUserController {
	constructor(private readonly getAllUserUseCase: GetAllUsersUseCase) {}

	@Get()
	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, description: 'Users found' })
	@ApiResponse({ status: 404, description: 'Users not found' })
	async getAllUsers(@Query() paginationNameAndEmailDto: PaginationNameAndEmailDto) {
		return await this.getAllUserUseCase.execute(paginationNameAndEmailDto);
	}
}
