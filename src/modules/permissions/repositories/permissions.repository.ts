import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { OutputGetPermissionDto } from '../dtos/output-get-permission.dto';
import { PermissionsEntity } from '../entities/permissions.entity';
import { PermissionRepositoryAbstractResponse } from '../interfaces/permission-repository-abstract-response';
import { PermissionsRepositoryAbstract } from './permissions.repository.abstratct';

@Injectable()
export class PermissionsRepository implements PermissionsRepositoryAbstract {
	constructor(
		@InjectRepository(PermissionsEntity)
		private readonly permissionsRepository: Repository<PermissionsEntity>,
	) {}

	async findAll(): Promise<PermissionRepositoryAbstractResponse[]> {
		const permissions = await this.permissionsRepository.find({
			relations: ['permissionSlugs'],
		});

		return permissions.map((permission) => ({
			id: permission.id,
			name: permission.name,
			description: permission.description,
			slugs: permission.permissionSlugs.map((permissionSlug) => permissionSlug.slug),
		}));
	}

	async create(permissions: PermissionsEntity): Promise<PermissionsEntity> {
		return await this.permissionsRepository.save(permissions);
	}

	async delete(id: string): Promise<DeleteResult> {
		return await this.permissionsRepository.delete(id);
	}

	async findOne(criteria: FindOneOptions<PermissionsEntity>): Promise<OutputGetPermissionDto | null> {
		const permission = await this.permissionsRepository.findOne({
			...criteria,
			relations: ['permissionSlugs'],
		});

		if (!permission) {
			return null;
		}

		return {
			id: permission.id,
			name: permission.name,
			description: permission.description,
			slugs: permission.permissionSlugs.map((permissionSlug) => permissionSlug.slug),
		};
	}
}
