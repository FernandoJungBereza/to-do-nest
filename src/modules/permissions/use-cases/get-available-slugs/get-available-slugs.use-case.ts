import { Injectable } from '@nestjs/common';
import { RouteDiscoveryService } from '../../authorization/route-discovery.service';
import { OutputAvailableSlugsDto } from '../../dtos/output-available-slug-route.dto';
import { PermissionsSlugsRepositoryAbstract } from '../../repositories/permissions-slugs.repository.abstract';

@Injectable()
export class GetAvailableSlugsUseCase {
	constructor(
		private readonly routeDiscoveryService: RouteDiscoveryService,
		private readonly permissionsSlugsRepository: PermissionsSlugsRepositoryAbstract,
	) {}

	async execute(): Promise<OutputAvailableSlugsDto> {
		const discoveredRoutes = this.routeDiscoveryService.discover();
		const registeredSlugs = new Set(await this.permissionsSlugsRepository.findAllRegisteredSlugs());

		return {
			routes: discoveredRoutes.map((route) => ({
				routeKey: route.routeKey,
				method: route.method,
				path: route.path,
				module: route.module,
				suggestedSlug: route.suggestedSlug,
				registered: registeredSlugs.has(route.suggestedSlug),
			})),
		};
	}
}
