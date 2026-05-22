import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { OutputGetPermissionDto } from '../dtos/output-get-permission.dto';
import { PermissionsEntity } from '../entities/permissions.entity';
import { PermissionsRepositoryAbstract } from '../repositories/permissions.repository.abstract';

@Injectable()
export class GetExistingPermissionUseCase {
	constructor(private readonly permissionsRepository: PermissionsRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<PermissionsEntity>): Promise<OutputGetPermissionDto> {
		const permission = await this.permissionsRepository.findOne(criteria);
		if (!permission) {
			const where = criteria.where || [];
			const whereClause = formatWhereClause(where);

			throw new NotFoundException(`Permissão não encontrada com os critérios: ${whereClause}`);
		}
		return permission;
	}
}
