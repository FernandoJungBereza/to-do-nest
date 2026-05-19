import { UserEntity } from '@/modules/user/entities/user.entity';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAuthDto } from '../dto/create-auth.dto';
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
    type: UserEntity,
    description: 'User registered successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async register(@Body() registerDto: CreateAuthDto) {
    return this.registerUseCase.execute(registerDto);
  }
}
