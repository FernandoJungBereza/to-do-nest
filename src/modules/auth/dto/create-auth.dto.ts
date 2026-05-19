import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateAuthDtoInterface } from '../interfaces/create-auth-dto.interface';

export class CreateAuthDto implements CreateAuthDtoInterface {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    required: true,
    type: String,
    minLength: 3,
    maxLength: 255,
    format: 'text',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
    required: true,
    type: String,
    minLength: 3,
    maxLength: 255,
    format: 'email',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
    required: true,
    type: String,
    minLength: 8,
    maxLength: 255,
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  password: string;
}
