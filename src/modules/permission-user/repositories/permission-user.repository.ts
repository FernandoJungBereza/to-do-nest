import { UserEntity } from '@/modules/user/entities/user.entity';
import { OutputUserPermissionsDto } from '@/modules/user/dtos/output-user-permissions.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionUserEntity } from '../entities/permission-user.entity';
import { PermissionUserRepositoryAbstract } from './permission-user.repository.abstract';

@Injectable()
export class PermissionUserRepository implements PermissionUserRepositoryAbstract {
	constructor(
		@InjectRepository(PermissionUserEntity)
		private readonly permissionUserRepository: Repository<PermissionUserEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	async assign(userId: string, permissionId: string): Promise<void> {
		await this.permissionUserRepository.save(
			this.permissionUserRepository.create({
				userId,
				permissionId,
			}),
		);
	}

	async isAssigned(userId: string, permissionId: string): Promise<boolean> {
		return await this.permissionUserRepository.exists({
			where: { userId, permissionId },
		});
	}

	async findPermissionsByUserId(userId: string): Promise<OutputUserPermissionsDto> {
		const user = await this.userRepository
			.createQueryBuilder('user')
			.leftJoinAndSelect('user.permissionUsers', 'permissionUser')
			.leftJoinAndSelect('permissionUser.permission', 'permission')
			.leftJoinAndSelect('permission.permissionSlugs', 'permissionSlug')
			.where('user.id = :userId', { userId })
			.getOneOrFail();

		return {
			id: user.id,
			name: user.name,
			permissions: user.permissionUsers.map((permissionUser) => ({
				id: permissionUser.permission.id,
				name: permissionUser.permission.name,
				description: permissionUser.permission.description,
				slugs: permissionUser.permission.permissionSlugs.map(
					(permissionSlug) => permissionSlug.slug,
				),
			})),
		};
	}
}
