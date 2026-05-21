import { Injectable } from '@nestjs/common';
import { PermissionsRepositoryAbstract } from '../../repositories/permissions.repository.abstratct';
import { GetExistingPermissionUseCase } from '../get-existing-permission.use-case';
import { OutputGetPermissionDto } from '../../dtos/output-get-permission.dto';

@Injectable()
export class FindOneByIdPermissionUseCase {
	constructor(
		private readonly permissionsRepository: PermissionsRepositoryAbstract,
		private readonly getExistingPermissionUseCase: GetExistingPermissionUseCase,
	) {}

	async execute(id: string): Promise<OutputGetPermissionDto> {
		const permission = await this.getExistingPermissionUseCase.execute({ where: { id } });

		return permission;
	}
}
