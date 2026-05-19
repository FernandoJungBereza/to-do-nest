import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PostToDoListDtoInterface } from '../interfaces/post-to-do-list-dto.interface';

export class PostToDoListDto implements PostToDoListDtoInterface {
  @ApiProperty({
    description: 'The title of the to-do list',
    example: 'Buy groceries',
    required: true,
    type: String,
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  title: string;
  @ApiProperty({
    description: 'The description of the to-do list',
    example: 'Buy groceries for the week',
    required: false,
    type: String,
    minLength: 3,
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The completed status of the to-do list',
    example: true,
    required: false,
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @ApiProperty({
    description: 'The user id of the to-do list',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The created at date of the to-do list',
    example: '2021-01-01T00:00:00.000Z',
    required: true,
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    description: 'The updated at date of the to-do list',
    example: '2021-01-01T00:00:00.000Z',
    required: true,
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
