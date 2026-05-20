import { ApiProperty } from '@nestjs/swagger';
import { ToDoListRepositoryAbstractResponse } from '../interfaces/to-do-list-repository-abstract-response';
import { OutputToDoListUserDto } from './output-to-do-list-user.dto';

export class OutputToDoListDto implements ToDoListRepositoryAbstractResponse {
	@ApiProperty({
		description: 'To-do list id',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	id: string;

	@ApiProperty({ description: 'To-do list title', example: 'Buy groceries' })
	title: string;

	@ApiProperty({
		description: 'To-do list description',
		example: 'Buy groceries for the week',
		required: false,
	})
	description?: string;

	@ApiProperty({ description: 'Completion status', example: false })
	completed?: boolean;

	@ApiProperty({
		description: 'Owner user id',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	userId: string;

	@ApiProperty({ description: 'Creation date' })
	createdAt: Date;

	@ApiProperty({ description: 'Last update date' })
	updatedAt: Date;

	@ApiProperty({ description: 'Owner user', type: OutputToDoListUserDto })
	user: OutputToDoListUserDto;
}
