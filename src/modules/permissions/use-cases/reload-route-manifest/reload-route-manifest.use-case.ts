import { ForbiddenException, Injectable } from '@nestjs/common';
import { RouteManifestService } from '../../authorization/route-manifest.service';
import { ADMIN_SLUG } from '../../constants/permission.constants';
import { RouteManifestRebuildResult } from '../../interfaces/route-manifest-rebuild-result.interface';
import { PermissionsAuthorizationService } from '../../authorization/permissions-authorization.service';

@Injectable()
export class ReloadRouteManifestUseCase {
	constructor(
		private readonly routeManifestService: RouteManifestService,
		private readonly permissionsAuthorizationService: PermissionsAuthorizationService,
	) {}

	async execute(userId: string): Promise<RouteManifestRebuildResult> {
		const userSlugs = await this.permissionsAuthorizationService.getSlugsByUserId(userId);

		if (!userSlugs.includes(ADMIN_SLUG)) {
			throw new ForbiddenException('Only admin can reload the route manifest');
		}

		return await this.routeManifestService.rebuild();
	}
}
