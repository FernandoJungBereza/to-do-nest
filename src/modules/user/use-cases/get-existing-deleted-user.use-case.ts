import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepositoryAbstract } from '../repositories/user.repository.abstract';

@Injectable()
export class GetExistingDeletedUserUseCase {
	constructor(private readonly userRepository: UserRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<UserEntity>): Promise<UserEntity[]> {
		const user = await this.userRepository.findDeletedById(criteria);

		if (!user) {
			const where = criteria.where || [];
			const whereClause = formatWhereClause(where);

			throw new NotFoundException(`Usuario não encontrado com os critérios: ${whereClause}`);
		}

		return user;
	}
}
