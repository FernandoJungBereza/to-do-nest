import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostToDoListDto } from '../../dtos/post-to-do-list.dto';
import { PostToDoListUseCase } from './post-to-do-list.use-case';

@ApiTags('To-do Lists')
@Controller('to-do-lists')
export class PostToDoListController {
  constructor(private readonly postToDoListUseCase: PostToDoListUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new to-do list' })
  @ApiResponse({ status: 201, description: 'To-do list created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async postToDoList(@Body() postToDoListDto: PostToDoListDto) {
    return await this.postToDoListUseCase.execute(postToDoListDto);
  }
}
