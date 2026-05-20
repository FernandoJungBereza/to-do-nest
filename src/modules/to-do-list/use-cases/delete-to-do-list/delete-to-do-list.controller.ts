import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteToDoListUseCase } from './delete-to-do-list.use-case';

@ApiTags('To-do Lists')
@Controller('to-do-lists')
export class DeleteToDoListController {
  constructor(private readonly deleteToDoListUseCase: DeleteToDoListUseCase) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a to-do list by ID' })
  @ApiResponse({ status: 200, description: 'To-do list deleted' })
  @ApiResponse({ status: 404, description: 'To-do list not found' })
  async deleteToDoList(@Param('id', ParseUUIDPipe) id: string) {
    return await this.deleteToDoListUseCase.execute(id);
  }
}
