import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteDiscoveryService } from '../../authorization/route-discovery.service';
import { RouteManifestService } from '../../authorization/route-manifest.service';
import { PostPermissionDto } from '../../dtos/post-permission.dto';
import { PermissionsEntity } from '../../entities/permissions.entity';
import { PermissionsSlugsRepositoryAbstract } from '../../repositories/permissions-slugs.repository.abstract';

@Injectable()
export class PostPermissionUseCase {
	constructor(
		@InjectRepository(PermissionsEntity)
		private readonly permissionsRepository: Repository<PermissionsEntity>,
		private readonly routeDiscoveryService: RouteDiscoveryService,
		private readonly permissionsSlugsRepository: PermissionsSlugsRepositoryAbstract,
		private readonly routeManifestService: RouteManifestService,
	) {}

	async execute(postPermissionDto: PostPermissionDto): Promise<void> {
		const validSlugs = new Set(
			this.routeDiscoveryService.discover().map((route) => route.suggestedSlug),
		);

		const invalidSlugs = postPermissionDto.permissionSlug.filter((slug) => !validSlugs.has(slug));

		if (invalidSlugs.length > 0) {
			throw new BadRequestException(`Invalid slugs: ${invalidSlugs.join(', ')}`);
		}

		for (const slug of postPermissionDto.permissionSlug) {
			if (await this.permissionsSlugsRepository.slugExists(slug)) {
				throw new ConflictException(`Slug "${slug}" is already registered`);
			}
		}

		await this.permissionsRepository.save(
			this.permissionsRepository.create({
				name: postPermissionDto.name,
				description: postPermissionDto.description,
				permissionSlugs: postPermissionDto.permissionSlug.map((slug) => ({ slug })),
			}),
		);

		await this.routeManifestService.rebuild();
	}
}
