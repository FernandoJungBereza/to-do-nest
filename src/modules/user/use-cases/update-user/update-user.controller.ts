import { Permission } from '@/modules/permissions/constants/permission.enum';
import { RequirePermission } from '@/modules/permissions/decorators/require-permission.decorator';
import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UpdateUserUseCase } from './update-user.use-case';

@ApiTags('Users')
@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

	@RequirePermission(Permission.UserUpdate)
	@Patch(':id')
	@ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.updateUserUseCase.execute(id, updateUserDto);
  }
}
