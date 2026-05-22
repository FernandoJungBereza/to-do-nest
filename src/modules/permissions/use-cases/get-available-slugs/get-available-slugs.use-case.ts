import { Injectable } from '@nestjs/common';
import { RouteDiscoveryService } from '../../authorization/route-discovery.service';
import { OutputAvailableSlugsDto } from '../../dtos/output-available-slug-route.dto';
import { buildSlugLabels } from '../../helpers/format-slug-labels.helper';

@Injectable()
export class GetAvailableSlugsUseCase {
	constructor(private readonly routeDiscoveryService: RouteDiscoveryService) {}

	async execute(): Promise<OutputAvailableSlugsDto> {
		const discoveredRoutes = this.routeDiscoveryService.discover();

		return {
			routes: discoveredRoutes.map((route) => {
				const { title, description } = buildSlugLabels(route.slug);
				return {
					method: route.method,
					module: route.module,
					slug: route.slug,
					title,
					description,
				};
			}),
		};
	}
}
