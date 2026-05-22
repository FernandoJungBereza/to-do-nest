import { Injectable } from '@nestjs/common';
import { RouteManifestService } from '../../authorization/route-manifest.service';
import { GetExistingPermissionUseCase } from '../get-existing-permission.use-case';
import { PermissionsRepositoryAbstract } from '../../repositories/permissions.repository.abstratct';

@Injectable()
export class DeletePermissionUseCase {
	constructor(
		private readonly permissionsRepository: PermissionsRepositoryAbstract,
		private readonly getExistingPermissionUseCase: GetExistingPermissionUseCase,
		private readonly routeManifestService: RouteManifestService,
	) {}

	async execute(id: string): Promise<void> {
		await this.getExistingPermissionUseCase.execute({ where: { id } });
		await this.permissionsRepository.delete(id);
		await this.routeManifestService.rebuild();
	}
}
