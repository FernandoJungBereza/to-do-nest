import { ApiProperty } from '@nestjs/swagger';
import { UserRepositoryAbstractResponse } from '../interfaces/user-repository-abstract-response';

export class OutputUserDto implements Pick<UserRepositoryAbstractResponse, 'id' | 'name' | 'email'> {
	@ApiProperty({ description: 'The id of the user' })
	id: string;
	@ApiProperty({ description: 'The name of the user' })
	name: string;
	@ApiProperty({ description: 'The email of the user' })
	email: string;
	@ApiProperty({ description: 'The creation date of the user' })
	createdAt: Date;
	@ApiProperty({ description: 'The last update date of the user' })
	updatedAt: Date;
}
