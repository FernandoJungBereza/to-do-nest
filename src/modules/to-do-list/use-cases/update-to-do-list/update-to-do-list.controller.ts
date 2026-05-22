import { Permission } from '@/modules/permissions/constants/permission.enum';
import { RequirePermission } from '@/modules/permissions/decorators/require-permission.decorator';
import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateToDoListDto } from '../../dtos/update-to-do-list.dto';
import { UpdateToDoListUseCase } from './update-to-do-list.use-case';

@ApiTags('To-do Lists')
@Controller('to-do-lists')
export class UpdateToDoListController {
	constructor(private readonly updateToDoListUseCase: UpdateToDoListUseCase) {}

	@RequirePermission(Permission.ToDoListUpdate)
	@Patch(':id')
	@ApiOperation({ summary: 'Update a to-do list by ID' })
	@ApiResponse({ status: 200, description: 'To-do list updated' })
	@ApiResponse({ status: 404, description: 'To-do list not found' })
	async updateToDoList(@Param('id', ParseUUIDPipe) id: string, @Body() updateToDoListDto: UpdateToDoListDto) {
		return await this.updateToDoListUseCase.execute(id, updateToDoListDto);
	}
}
