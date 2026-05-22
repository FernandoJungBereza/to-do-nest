import { Injectable } from '@nestjs/common';
import { PostPermissionDto } from '../../dtos/post-permission.dto';
import { PermissionsRepositoryAbstract } from '../../repositories/permissions.repository.abstract';
import { ThrowIfExistPermissionUseCase } from '../throw-if-exist-permission.use-case';

@Injectable()
export class PostPermissionUseCase {
	constructor(
		private readonly permissionsRepository: PermissionsRepositoryAbstract,
		private readonly throwIfExistPermissionUseCase: ThrowIfExistPermissionUseCase,
	) {}

	async execute(postPermissionDto: PostPermissionDto): Promise<void> {
		await this.throwIfExistPermissionUseCase.execute({
			where: { name: postPermissionDto.name },
		});

		const permission = await this.permissionsRepository.create(postPermissionDto);
		await this.permissionsRepository.save(permission);
	}
}
