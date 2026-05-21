import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';

import { PermissionsEntity } from '../entities/permissions.entity';
import { PermissionRepositoryAbstractResponse } from '../interfaces/permission-repository-abstract-response';
import { PermissionsRepositoryAbstract } from './permissions.repository.abstratct';
import { OutputGetPermissionDto } from '../dtos/output-get-permission.dto';

@Injectable()
export class PermissionsRepository implements PermissionsRepositoryAbstract {
	constructor(
		@InjectRepository(PermissionsEntity)
		private readonly permissionsRepository: Repository<PermissionsEntity>,
	) {}

	async findAll(): Promise<PermissionRepositoryAbstractResponse[]> {
		return await this.permissionsRepository.find();
	}

	async create(permissions: PermissionsEntity): Promise<PermissionsEntity> {
		return await this.permissionsRepository.save(permissions);
	}

	async delete(id: string): Promise<DeleteResult> {
		return await this.permissionsRepository.delete(id);
	}

	async findOne(criteria: FindOneOptions<PermissionsEntity>): Promise<OutputGetPermissionDto | null> {
		return await this.permissionsRepository.findOne(criteria);
	}
}
