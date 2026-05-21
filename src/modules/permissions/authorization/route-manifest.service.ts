import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RouteManifestRebuildResult } from '../interfaces/route-manifest-rebuild-result.interface';
import { PermissionsSlugsRepositoryAbstract } from '../repositories/permissions-slugs.repository.abstract';
import { RouteDiscoveryService } from './route-discovery.service';

@Injectable()
export class RouteManifestService implements OnModuleInit {
	private readonly logger = new Logger(RouteManifestService.name);
	private readonly routePermissions = new Map<string, string>();

	constructor(
		private readonly routeDiscoveryService: RouteDiscoveryService,
		private readonly permissionsSlugsRepository: PermissionsSlugsRepositoryAbstract,
	) {}

	async onModuleInit(): Promise<void> {
		await this.rebuild();
	}

	async rebuild(): Promise<RouteManifestRebuildResult> {
		const discoveredRoutes = this.routeDiscoveryService.discover();
		const registeredSlugs = await this.permissionsSlugsRepository.findAllRegisteredSlugs();
		const registeredSlugSet = new Set(registeredSlugs);

		this.routePermissions.clear();

		for (const route of discoveredRoutes) {
			if (registeredSlugSet.has(route.suggestedSlug)) {
				this.routePermissions.set(route.routeKey, route.suggestedSlug);
			}
		}

		const result: RouteManifestRebuildResult = {
			mappedRoutes: this.routePermissions.size,
			discoveredRoutes: discoveredRoutes.length,
			registeredSlugs: registeredSlugs.length,
		};

		this.logger.log(
			`Route manifest rebuilt: ${result.mappedRoutes} mapped / ${result.discoveredRoutes} discovered / ${result.registeredSlugs} slug(s) in database`,
		);

		return result;
	}

	getRequiredSlug(routeKey: string): string | undefined {
		return this.routePermissions.get(routeKey);
	}

	getMappedRouteCount(): number {
		return this.routePermissions.size;
	}
}
