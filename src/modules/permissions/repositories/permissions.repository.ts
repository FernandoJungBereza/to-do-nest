import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PermissionsEntity } from '../entities/permissions.entity';
import { PermissionsRepositoryAbstract } from './permissions.repository.abstratct';

@Injectable()
export class PermissionsRepository implements PermissionsRepositoryAbstract {
	constructor(
		@InjectRepository(PermissionsEntity)
		private readonly permissionsRepository: Repository<PermissionsEntity>,
	) {}

	async findAll(): Promise<PermissionsEntity[]> {
		return await this.permissionsRepository.find();
	}

	async create(permissions: PermissionsEntity): Promise<PermissionsEntity> {
		return await this.permissionsRepository.save(permissions);
	}

	async delete(id: string): Promise<DeleteResult> {
		return await this.permissionsRepository.delete(id);
	}
}
