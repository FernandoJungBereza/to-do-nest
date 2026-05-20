import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostUserDto } from '../../dtos/post-user.dto';
import { PostUserUseCase } from './post-user.use-case';

@ApiTags('Users')
@Controller('users')
export class PostUserController {
	constructor(private readonly postUserUseCase: PostUserUseCase) {}

	@Post()
	@ApiOperation({ summary: 'Create a new user' })
	@ApiResponse({ status: 201, description: 'User created' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	async postUser(@Body() postUserDto: PostUserDto) {
		return await this.postUserUseCase.execute(postUserDto);
	}
}
