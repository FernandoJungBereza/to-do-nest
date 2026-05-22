import { PaginationNameAndEmailDto } from '@/shared/dtos/joins/pagination-name-and-email.dto';
import { Injectable } from '@nestjs/common';
import { OutputPaginatedUserDto } from '../../dtos/output-paginated-user.dto';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';

@Injectable()
export class GetPaginatedUsersUseCase {
	constructor(private readonly userRepository: UserRepositoryAbstract) {}

	async execute(paginationNameAndEmailDto: PaginationNameAndEmailDto): Promise<OutputPaginatedUserDto> {
		return await this.userRepository.findPaginated(paginationNameAndEmailDto);
	}
}
