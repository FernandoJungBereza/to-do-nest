import { GetExistingPermissionUseCase } from '@/modules/permissions/use-cases/get-existing-permission.use-case';
import { PermissionUserRepositoryAbstract } from '@/modules/permission-user/repositories/permission-user.repository.abstract';
import { ConflictException, Injectable } from '@nestjs/common';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class AssignPermissionUseCase {
	constructor(
		private readonly permissionUserRepository: PermissionUserRepositoryAbstract,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
		private readonly getExistingPermissionUseCase: GetExistingPermissionUseCase,
	) {}

	async execute(userId: string, permissionId: string): Promise<void> {
		await this.getExistingUserUseCase.execute({ where: { id: userId } });
		await this.getExistingPermissionUseCase.execute({ where: { id: permissionId } });

		const assigned = await this.permissionUserRepository.isAssigned(userId, permissionId);

		if (assigned) {
			throw new ConflictException('Permission already assigned to this user');
		}

		await this.permissionUserRepository.assign(userId, permissionId);
	}
}
