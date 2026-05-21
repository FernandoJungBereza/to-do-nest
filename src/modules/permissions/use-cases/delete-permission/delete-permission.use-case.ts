import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteManifestService } from '../../authorization/route-manifest.service';
import { PermissionsEntity } from '../../entities/permissions.entity';
import { GetExistingPermissionUseCase } from '../get-existing-permission.use-case';

@Injectable()
export class DeletePermissionUseCase {
	constructor(
		@InjectRepository(PermissionsEntity)
		private readonly permissionsRepository: Repository<PermissionsEntity>,
		private readonly getExistingPermissionUseCase: GetExistingPermissionUseCase,
		private readonly routeManifestService: RouteManifestService,
	) {}

	async execute(id: string): Promise<void> {
		await this.getExistingPermissionUseCase.execute({ where: { id } });
		await this.permissionsRepository.delete(id);
		await this.routeManifestService.rebuild();
	}
}
