import { Injectable } from '@nestjs/common';
import { ALL_PERMISSIONS, Permission } from '../../constants/permission.enum';
import { PERMISSION_METADATA } from '../../constants/permission.metadata';
import { OutputAvailablePermissionsDto } from '../../dtos/output-available-permission.dto';
import { formatModuleDisplayName } from '../../helpers/format-module-display-name.helper';
import { PermissionsRepositoryAbstract } from '../../repositories/permissions.repository.abstract';

@Injectable()
export class GetAvailablePermissionsUseCase {
	constructor(private readonly permissionsRepository: PermissionsRepositoryAbstract) {}

	async execute(): Promise<OutputAvailablePermissionsDto> {
		const registeredNames = new Set(await this.permissionsRepository.findRegisteredNames());
		const byModule = new Map<string, { name: string; title: string; suggestedDescription: string; registered: boolean }[]>();

		for (const permissionName of ALL_PERMISSIONS) {
			if (permissionName === Permission.Admin) {
				continue;
			}

			const metadata = PERMISSION_METADATA[permissionName];
			const entries = byModule.get(metadata.module) ?? [];
			entries.push({
				name: permissionName,
				title: metadata.title,
				suggestedDescription: metadata.defaultDescription,
				registered: registeredNames.has(permissionName),
			});
			byModule.set(metadata.module, entries);
		}

		const modules = [...byModule.entries()]
			.sort(([moduleA], [moduleB]) => moduleA.localeCompare(moduleB))
			.map(([moduleKey, permissions]) => ({
				name: formatModuleDisplayName(moduleKey),
				permissions: permissions.sort((a, b) => a.name.localeCompare(b.name)),
			}));

		return { modules };
	}
}
