import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';
import { GetExistingPermissionUseCase } from '@/modules/permissions/use-cases/get-existing-permission.use-case';

@Injectable()
export class AssignPermissionUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
		private readonly getExistingPermissionUseCase: GetExistingPermissionUseCase,
	) {}

	async execute(userId: string, permissionId: string): Promise<void> {
		await this.getExistingUserUseCase.execute({ where: { id: userId } });
		await this.getExistingPermissionUseCase.execute({ where: { id: permissionId } });

		const assigned = await this.userRepository.isPermissionAssigned(userId, permissionId);

		if (assigned) {
			throw new ConflictException('Permission already assigned to this user');
		}

		await this.userRepository.assignPermission(userId, permissionId);
	}
}
