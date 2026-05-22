import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { ConflictException, Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { PermissionsEntity } from '../entities/permissions.entity';
import { PermissionsRepositoryAbstract } from '../repositories/permissions.repository.abstract';

@Injectable()
export class ThrowIfExistPermissionUseCase {
	constructor(private readonly permissionsRepository: PermissionsRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<PermissionsEntity>): Promise<void> {
		const permission = await this.permissionsRepository.findOne(criteria);

		if (permission) {
			const where = criteria.where || [];
			const whereClause = formatWhereClause(where);

			throw new ConflictException(`Permissão já cadastrada com os critérios: ${whereClause}`);
		}
	}
}
