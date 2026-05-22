import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { RouteDiscoveryService } from '../../authorization/route-discovery.service';
import { RouteManifestService } from '../../authorization/route-manifest.service';
import { OutputGetPermissionDto } from '../../dtos/output-get-permission.dto';
import { PostPermissionDto } from '../../dtos/post-permission.dto';
import { mapPermissionToOutput } from '../../helpers/map-permission-to-output.helper';
import { PermissionsRepositoryAbstract } from '../../repositories/permissions.repository.abstratct';
import { PermissionsSlugsRepositoryAbstract } from '../../repositories/permissions-slugs.repository.abstract';

@Injectable()
export class PostPermissionUseCase {
	constructor(
		private readonly routeDiscoveryService: RouteDiscoveryService,
		private readonly permissionsSlugsRepository: PermissionsSlugsRepositoryAbstract,
		private readonly permissionsRepository: PermissionsRepositoryAbstract,
		private readonly routeManifestService: RouteManifestService,
	) {}

	async execute(postPermissionDto: PostPermissionDto): Promise<OutputGetPermissionDto> {
		const validSlugs = new Set(this.routeDiscoveryService.discover().map((route) => route.slug));

		const invalidSlugs = postPermissionDto.permissionSlug.filter((slug) => !validSlugs.has(slug));

		if (invalidSlugs.length > 0) {
			throw new BadRequestException(`Invalid slugs: ${invalidSlugs.join(', ')}`);
		}

		for (const slug of postPermissionDto.permissionSlug) {
			if (await this.permissionsSlugsRepository.slugExists(slug)) {
				throw new ConflictException(`Slug "${slug}" is already registered`);
			}
		}

		const permission = await this.permissionsRepository.create(postPermissionDto);
		const savedPermission = await this.permissionsRepository.save(permission);

		await this.routeManifestService.rebuild();

		return mapPermissionToOutput(savedPermission);
	}
}
