import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class OutputGetAllPermissionsDto {
	@ApiProperty({ description: 'The id of the permission' })
	@IsString()
	@IsNotEmpty()
	id: string;
	@ApiProperty({ description: 'The name of the permission' })
	@IsString()
	@IsNotEmpty()
	name: string;
	@ApiProperty({ description: 'The description of the permission' })
	@IsString()
	@IsNotEmpty()
	description: string;
}
