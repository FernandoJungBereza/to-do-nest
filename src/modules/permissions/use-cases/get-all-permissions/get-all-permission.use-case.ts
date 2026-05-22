import { Injectable } from '@nestjs/common';
import { PermissionsRepositoryAbstract } from '../../repositories/permissions.repository.abstract';
import { PermissionRepositoryAbstractResponse } from '../../interfaces/permission-repository-abstract-response';

@Injectable()
export class GetAllPermissionUseCase {
	constructor(private readonly permissionsRepository: PermissionsRepositoryAbstract) {}

	async execute(): Promise<PermissionRepositoryAbstractResponse[]> {
		return await this.permissionsRepository.findAll();
	}
}
