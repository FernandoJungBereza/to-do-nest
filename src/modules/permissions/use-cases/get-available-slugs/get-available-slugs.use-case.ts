import { Injectable } from '@nestjs/common';
import { RouteDiscoveryService } from '../../authorization/route-discovery.service';
import { OutputAvailableSlugsDto } from '../../dtos/output-available-slug-route.dto';
import { buildSlugLabels, formatModuleDisplayName } from '../../helpers/format-slug-labels.helper';
import { DiscoveredRouteAuthorization } from '../../interfaces/discovered-route-authorization.interface';

@Injectable()
export class GetAvailableSlugsUseCase {
	constructor(private readonly routeDiscoveryService: RouteDiscoveryService) {}

	async execute(): Promise<OutputAvailableSlugsDto> {
		const discoveredRoutes = this.routeDiscoveryService.discover();
		const uniqueByModule = new Map<string, Map<string, DiscoveredRouteAuthorization>>();

		for (const route of discoveredRoutes) {
			if (!uniqueByModule.has(route.module)) {
				uniqueByModule.set(route.module, new Map());
			}

			const slugsInModule = uniqueByModule.get(route.module)!;

			if (!slugsInModule.has(route.slug)) {
				slugsInModule.set(route.slug, route);
			}
		}

		const modules = [...uniqueByModule.entries()]
			.sort(([moduleA], [moduleB]) => moduleA.localeCompare(moduleB))
			.map(([moduleKey, slugsInModule]) => ({
				name: formatModuleDisplayName(moduleKey),
				routes: [...slugsInModule.values()]
					.sort((routeA, routeB) => routeA.slug.localeCompare(routeB.slug))
					.map((route) => {
						const { title, description } = buildSlugLabels(route.slug);
						return {
							method: route.method,
							slug: route.slug,
							title,
							description,
						};
					}),
			}));

		return { modules };
	}
}
