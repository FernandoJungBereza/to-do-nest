import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { OutputGetPermissionDto } from '../dtos/output-get-permission.dto';
import { PostPermissionDto } from '../dtos/post-permission.dto';
import { PermissionsEntity } from '../entities/permissions.entity';
import { PermissionsRepositoryAbstract } from './permissions.repository.abstract';

@Injectable()
export class PermissionsRepository implements PermissionsRepositoryAbstract {
	constructor(
		@InjectRepository(PermissionsEntity)
		private readonly permissionsRepository: Repository<PermissionsEntity>,
	) {}

	async findAll(): Promise<OutputGetPermissionDto[]> {
		const permissions = await this.permissionsRepository.find();

		return permissions.map((permission) => this.toOutput(permission));
	}

	async findRegisteredNames(): Promise<string[]> {
		const rows = await this.permissionsRepository.find({ select: ['name'] });
		return rows.map((row) => row.name);
	}

	async create(postPermissionDto: PostPermissionDto): Promise<PermissionsEntity> {
		return this.permissionsRepository.create({
			name: postPermissionDto.name,
			description: postPermissionDto.description,
		});
	}

	async save(permission: PermissionsEntity): Promise<PermissionsEntity> {
		return await this.permissionsRepository.save(permission);
	}

	async delete(id: string): Promise<DeleteResult> {
		return await this.permissionsRepository.delete(id);
	}

	async findOne(criteria: FindOneOptions<PermissionsEntity>): Promise<OutputGetPermissionDto | null> {
		const permission = await this.permissionsRepository.findOne(criteria);

		if (!permission) {
			return null;
		}

		return this.toOutput(permission);
	}

	private toOutput(permission: PermissionsEntity): OutputGetPermissionDto {
		return {
			id: permission.id,
			name: permission.name,
			description: permission.description,
		};
	}
}
