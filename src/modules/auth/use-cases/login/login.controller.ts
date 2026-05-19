import { LoginDto } from '@/modules/auth/dtos/login.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUseCase } from './login.use-case';

@ApiTags('Auth')
@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: LoginDto) {
    return await this.loginUseCase.execute(loginDto);
  }
}
