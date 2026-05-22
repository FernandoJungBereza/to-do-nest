import { PermissionsAuthorizationService } from '@/modules/permissions/authorization/permissions-authorization.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { GetExistingPermissionUseCase } from '@/modules/permissions/use-cases/get-existing-permission.use-case';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class AssignPermissionUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
		private readonly getExistingPermissionUseCase: GetExistingPermissionUseCase,
		private readonly permissionsAuthorizationService: PermissionsAuthorizationService,
	) {}

	async execute(actorUserId: string, userId: string, permissionId: string): Promise<void> {
		await this.permissionsAuthorizationService.assertUserIsAdmin(
			actorUserId,
			'Only admin can assign permissions to users',
		);

		await this.getExistingUserUseCase.execute({ where: { id: userId } });
		await this.getExistingPermissionUseCase.execute({ where: { id: permissionId } });

		const assigned = await this.userRepository.isPermissionAssigned(userId, permissionId);

		if (assigned) {
			throw new ConflictException('Permission already assigned to this user');
		}

		await this.userRepository.assignPermission(userId, permissionId);
	}
}
