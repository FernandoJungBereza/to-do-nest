import { Injectable } from '@nestjs/common';
import { RouteManifestService } from '../../authorization/route-manifest.service';
import { RouteManifestRebuildResult } from '../../interfaces/route-manifest-rebuild-result.interface';
import { PermissionsAuthorizationService } from '../../authorization/permissions-authorization.service';

@Injectable()
export class ReloadRouteManifestUseCase {
	constructor(
		private readonly routeManifestService: RouteManifestService,
		private readonly permissionsAuthorizationService: PermissionsAuthorizationService,
	) {}

	async execute(userId: string): Promise<RouteManifestRebuildResult> {
		await this.permissionsAuthorizationService.assertUserIsAdmin(
			userId,
			'Only admin can reload the route manifest',
		);

		return await this.routeManifestService.rebuild();
	}
}
