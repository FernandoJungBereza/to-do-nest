import { OutputPaginatedDto } from '@/shared/dtos/generics/output-paginated.dto';
import { ApiProperty } from '@nestjs/swagger';
import { OutputToDoListDto } from './output-to-do-list.dto';

export class OutputPaginatedToDoListDto extends OutputPaginatedDto<OutputToDoListDto> {
	@ApiProperty({ type: [OutputToDoListDto], description: 'Paginated to-do lists' })
	declare data: OutputToDoListDto[];
}
