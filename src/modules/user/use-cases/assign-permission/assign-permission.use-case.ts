import { PermissionsRepositoryAbstract } from '@/modules/permissions/repositories/permissions.repository.abstratct';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';

@Injectable()
export class AssignPermissionUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly permissionRepository: PermissionsRepositoryAbstract,
	) {}

	async execute(userId: string, permissionId: string): Promise<void> {
		const user = await this.userRepository.findOne({ where: { id: userId } });
		const permission = await this.permissionRepository.findOne({ where: { id: permissionId } });

		if (!user || !permission) {
			throw new NotFoundException('User or permission not found');
		}

		// user.permissions.push(permission);
		// await this.userRepository.save(user);
	}
}
