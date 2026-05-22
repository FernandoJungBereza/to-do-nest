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

	async getPermissionNamesByUserId(userId: string): Promise<string[]> {
		const rows = await this.permissionUserRepository
			.createQueryBuilder('permissionUser')
			.innerJoin('permissionUser.permission', 'permission')
			.select('permission.name', 'name')
			.where('permissionUser.userId = :userId', { userId })
			.distinct(true)
			.getRawMany<{ name: string }>();

		return rows.map((row) => row.name);
	}
}
