import { ConflictException, Injectable } from '@nestjs/common';
import { PostPermissionDto } from '../../dtos/post-permission.dto';
import { mapPermissionToOutput } from '../../helpers/map-permission-to-output.helper';
import { PermissionsRepositoryAbstract } from '../../repositories/permissions.repository.abstract';

@Injectable()
export class PostPermissionUseCase {
	constructor(private readonly permissionsRepository: PermissionsRepositoryAbstract) {}

	async execute(postPermissionDto: PostPermissionDto): Promise<void> {
		if (await this.permissionsRepository.existsByName(postPermissionDto.name)) {
			throw new ConflictException(`Permission "${postPermissionDto.name}" is already registered`);
		}

		const permission = await this.permissionsRepository.create(postPermissionDto);
		const savedPermission = await this.permissionsRepository.save(permission);

		return mapPermissionToOutput(savedPermission);
	}
}
