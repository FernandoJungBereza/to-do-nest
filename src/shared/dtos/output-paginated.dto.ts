import { ApiProperty } from '@nestjs/swagger';

export class OutputPaginatedDto<T> {
	@ApiProperty({ description: 'The data of the paginated response' })
	data: T[];
	@ApiProperty({ description: 'The current page of the paginated response' })
	currentPage: number;
	@ApiProperty({ description: 'The total pages of the paginated response' })
	totalPages: number;
	@ApiProperty({ description: 'The total items of the paginated response' })
	totalItems: number;
	@ApiProperty({ description: 'The items per page of the paginated response' })
	itemsPerPage: number;

	constructor(partial: Partial<OutputPaginatedDto<T>>) {
		Object.assign(this, partial);
	}
}
