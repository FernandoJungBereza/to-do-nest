import { ApiProperty } from '@nestjs/swagger';

export class OutputToDoListUserDto {
	@ApiProperty({ description: 'User name', example: 'John Doe' })
	name: string;

	@ApiProperty({ description: 'User email', example: 'john@example.com' })
	email: string;
}
