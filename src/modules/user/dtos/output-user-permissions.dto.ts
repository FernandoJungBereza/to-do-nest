import { OutputGetPermissionDto } from '@/modules/permissions/dtos/output-get-permission.dto';
import { UserPermissionsInterface } from '../interfaces/user-permissions.interface';
import { ApiProperty } from '@nestjs/swagger';

export class OutputUserPermissionsDto implements UserPermissionsInterface {
	@ApiProperty({ description: 'The id of the user' })
	id: string;
	@ApiProperty({ description: 'The name of the user' })
	name: string;
	@ApiProperty({ description: 'The permissions of the user' })
	permissions: OutputGetPermissionDto[];
}
