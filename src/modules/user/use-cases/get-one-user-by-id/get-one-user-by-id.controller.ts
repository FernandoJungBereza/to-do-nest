import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetOneUserByIdUseCase } from './get-one-user-by-id.use-case';

@ApiTags('Users')
@Controller('users')
export class GetOneUserByIdController {
  constructor(private readonly getOneUserByIdUseCase: GetOneUserByIdUseCase) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getOneUserById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.getOneUserByIdUseCase.execute(id);
  }
}
