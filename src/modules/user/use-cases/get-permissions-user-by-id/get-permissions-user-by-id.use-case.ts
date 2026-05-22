import { PermissionUserRepositoryAbstract } from '@/modules/permission-user/repositories/permission-user.repository.abstract';
import { Injectable } from '@nestjs/common';
import { OutputUserPermissionsDto } from '../../dtos/output-user-permissions.dto';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class GetPermissionsUserIdUseCase {
	constructor(
		private readonly permissionUserRepository: PermissionUserRepositoryAbstract,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
	) {}

	async execute(userId: string): Promise<OutputUserPermissionsDto> {
		await this.getExistingUserUseCase.execute({ where: { id: userId } });
		return await this.permissionUserRepository.findPermissionsByUserId(userId);
	}
}
