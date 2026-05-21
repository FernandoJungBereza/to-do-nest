import { PermissionUserEntity } from '@/modules/permission-user/entities/permission-user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsAuthorizationService {
	constructor(
		@InjectRepository(PermissionUserEntity)
		private readonly permissionUserRepository: Repository<PermissionUserEntity>,
	) {}

	async getSlugsByUserId(userId: string): Promise<string[]> {
		const rows = await this.permissionUserRepository
			.createQueryBuilder('permissionUser')
			.innerJoin('permissionUser.permission', 'permission')
			.innerJoin('permission.permissionSlugs', 'permissionSlug')
			.select('permissionSlug.slug', 'slug')
			.where('permissionUser.userId = :userId', { userId })
			.distinct(true)
			.getRawMany<{ slug: string }>();

		return rows.map((row) => row.slug);
	}
}
