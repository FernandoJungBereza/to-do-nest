import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostPermissionDto } from '../../dtos/post-permission.dto';
import { PermissionsEntity } from '../../entities/permissions.entity';

@Injectable()
export class PostPermissionUseCase {
	constructor(
		@InjectRepository(PermissionsEntity)
		private readonly permissionsRepository: Repository<PermissionsEntity>,
	) {}

	async execute(postPermissionDto: PostPermissionDto): Promise<void> {
		await this.permissionsRepository.save(
			this.permissionsRepository.create({
				name: postPermissionDto.name,
				description: postPermissionDto.description,
				permissionSlugs: postPermissionDto.permissionSlug.map((slug) => ({ slug })),
			}),
		);
	}
}
