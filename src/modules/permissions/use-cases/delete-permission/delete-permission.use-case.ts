import { Injectable } from '@nestjs/common';
import { GetExistingPermissionUseCase } from '../get-existing-permission.use-case';
import { PermissionsRepositoryAbstract } from '../../repositories/permissions.repository.abstract';

@Injectable()
export class DeletePermissionUseCase {
	constructor(
		private readonly permissionsRepository: PermissionsRepositoryAbstract,
		private readonly getExistingPermissionUseCase: GetExistingPermissionUseCase,
	) {}

	async execute(id: string): Promise<void> {
		await this.getExistingPermissionUseCase.execute({ where: { id } });
		await this.permissionsRepository.delete(id);
	}
}
