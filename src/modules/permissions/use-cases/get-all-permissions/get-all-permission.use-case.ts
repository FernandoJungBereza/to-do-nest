import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionsEntity } from '../../entities/permissions.entity';

@Injectable()
export class GetAllPermissionUseCase {
	constructor(
		@InjectRepository(PermissionsEntity)
		private readonly permissionsRepository: Repository<PermissionsEntity>,
	) {}

	async execute(): Promise<PermissionsEntity[]> {
		return await this.permissionsRepository.find();
	}
}
