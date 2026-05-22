import { Permission } from '@/modules/permissions/constants/permission.enum';
import { RequirePermission } from '@/modules/permissions/decorators/require-permission.decorator';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputToDoListDto } from '../../dtos/output-to-do-list.dto';
import { GetOneToDoListByIdUseCase } from './get-one-to-do-list-by-id.use-case';

@ApiTags('To-do Lists')
@Controller('to-do-lists')
export class GetOneToDoListByIdController {
	constructor(private readonly getOneToDoListByIdUseCase: GetOneToDoListByIdUseCase) {}

	@RequirePermission(Permission.ToDoListFind)
	@Get(':id')
	@ApiOperation({ summary: 'Get a to-do list by ID' })
	@ApiResponse({ status: 200, description: 'To-do list found', type: OutputToDoListDto })
	@ApiResponse({ status: 404, description: 'To-do list not found' })
	async getOneToDoListById(@Param('id', ParseUUIDPipe) id: string) {
		return await this.getOneToDoListByIdUseCase.execute(id);
	}
}
