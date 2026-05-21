import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionsEntity } from '../../entities/permissions.entity';

@Injectable()
export class DeletePermissionUseCase {
	constructor(
		@InjectRepository(PermissionsEntity)
		private readonly permissionsRepository: Repository<PermissionsEntity>,
	) {}

	async execute(id: string, userId: string): Promise<void> {
		await this.permissionsRepository.delete(id);
	}
}
