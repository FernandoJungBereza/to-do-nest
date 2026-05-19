import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { RegisterUserDto } from '@/modules/user/dtos/register-user.dto';
import { RegisterAuthUseCase } from '../use-cases/register-auth.use-case';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly registerUseCase: RegisterAuthUseCase) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Register a new user',
  })
  @ApiCreatedResponse({
    description: 'User registered successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.registerUseCase.execute(registerUserDto);
  }
}
