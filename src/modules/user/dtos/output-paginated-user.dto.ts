import { OutputPaginatedDto } from '@/shared/dtos/generics/output-paginated.dto';
import { ApiProperty } from '@nestjs/swagger';
import { OutputUserDto } from './output-user.dto';

export class OutputPaginatedUserDto extends OutputPaginatedDto<OutputUserDto> {
	@ApiProperty({ type: [OutputUserDto], description: 'Paginated users' })
	declare data: OutputUserDto[];
}
