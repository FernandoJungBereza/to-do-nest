import { GetExistingPermissionUseCase } from '@/modules/permissions/use-cases/get-existing-permission.use-case';
import { Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class AssignPermissionUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly getExistingPermissionUseCase: GetExistingPermissionUseCase,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
	) {}

	async execute(userId: string, permissionId: string): Promise<void> {
		const user = await this.getExistingUserUseCase.execute({ where: { id: userId } });
		const permission = await this.getExistingPermissionUseCase.execute({ where: { id: permissionId } });

		await this.userRepository.assignPermission(userId, permissionId);
	}
}
