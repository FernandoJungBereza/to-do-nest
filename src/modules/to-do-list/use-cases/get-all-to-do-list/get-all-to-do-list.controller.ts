import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllToDoListUseCase } from './get-all-to-do-list.use-case';

@ApiTags('To-do Lists')
@Controller('to-do-lists')
export class GetAllToDoListController {
  constructor(private readonly getAllToDoListUseCase: GetAllToDoListUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get all to-do lists for a user' })
  @ApiResponse({ status: 200, description: 'To-do lists found' })
  @ApiResponse({ status: 404, description: 'To-do lists not found' })
  async getAllToDoList() {
    return await this.getAllToDoListUseCase.execute();
  }
}
