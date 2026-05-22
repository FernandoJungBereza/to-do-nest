import { NotFoundException } from '@nestjs/common';
import { RouteManifestService } from '../../authorization/route-manifest.service';
import { OutputGetPermissionDto } from '../../dtos/output-get-permission.dto';
import { GetExistingPermissionUseCase } from '../get-existing-permission.use-case';
import { DeletePermissionUseCase } from './delete-permission.use-case';
import { PermissionsRepositoryAbstract } from '../../repositories/permissions.repository.abstratct';

describe('DeletePermissionUseCase', () => {
	const permissionId = 'permission-id';
	const existingPermission: OutputGetPermissionDto = {
		id: permissionId,
		name: 'Admin',
		description: 'Admin permission',
		slugs: ['users.create'],
	};

	let permissionsRepositoryMock: { delete: jest.Mock };
	let getExistingPermissionUseCaseMock: { execute: jest.Mock };
	let routeManifestServiceMock: { rebuild: jest.Mock };
	let useCase: DeletePermissionUseCase;

	beforeEach(() => {
		permissionsRepositoryMock = {
			delete: jest.fn().mockResolvedValue({ affected: 1 }),
		};
		getExistingPermissionUseCaseMock = {
			execute: jest.fn().mockResolvedValue(existingPermission),
		};
		routeManifestServiceMock = {
			rebuild: jest.fn().mockResolvedValue({
				mappedRoutes: 1,
				discoveredRoutes: 2,
				registeredSlugs: 3,
			}),
		};

		useCase = new DeletePermissionUseCase(
			permissionsRepositoryMock as unknown as PermissionsRepositoryAbstract,
			getExistingPermissionUseCaseMock as unknown as GetExistingPermissionUseCase,
			routeManifestServiceMock as unknown as RouteManifestService,
		);
	});

	it('should be defined', () => {
		expect(useCase).toBeDefined();
	});

	it('should delete a permission', async () => {
		await useCase.execute(permissionId);

		expect(getExistingPermissionUseCaseMock.execute).toHaveBeenCalledWith({
			where: { id: permissionId },
		});
		expect(permissionsRepositoryMock.delete).toHaveBeenCalledWith(permissionId);
		expect(routeManifestServiceMock.rebuild).toHaveBeenCalledTimes(1);
	});

	it('should not delete when permission does not exist', async () => {
		getExistingPermissionUseCaseMock.execute.mockRejectedValue(new NotFoundException('Permissão não encontrada'));

		await expect(useCase.execute(permissionId)).rejects.toThrow(NotFoundException);

		expect(permissionsRepositoryMock.delete).not.toHaveBeenCalled();
		expect(routeManifestServiceMock.rebuild).not.toHaveBeenCalled();
	});
});
