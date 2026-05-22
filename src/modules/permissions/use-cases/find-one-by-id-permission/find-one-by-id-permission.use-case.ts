import { Injectable } from '@nestjs/common';
import { OutputGetPermissionDto } from '../../dtos/output-get-permission.dto';
import { GetExistingPermissionUseCase } from '../get-existing-permission.use-case';

@Injectable()
export class FindOneByIdPermissionUseCase {
	constructor(private readonly getExistingPermissionUseCase: GetExistingPermissionUseCase) {}

	async execute(id: string): Promise<OutputGetPermissionDto> {
		const permission = await this.getExistingPermissionUseCase.execute({ where: { id } });

		return permission;
	}
}
