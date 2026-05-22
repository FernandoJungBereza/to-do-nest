import { NotFoundException } from '@nestjs/common';
import { Permission } from '../../constants/permission.enum';
import { OutputGetPermissionDto } from '../../dtos/output-get-permission.dto';
import { GetExistingPermissionUseCase } from '../get-existing-permission.use-case';
import { DeletePermissionUseCase } from './delete-permission.use-case';
import { PermissionsRepositoryAbstract } from '../../repositories/permissions.repository.abstract';

describe('DeletePermissionUseCase', () => {
	const permissionId = 'permission-id';
	const existingPermission: OutputGetPermissionDto = {
		id: permissionId,
		name: Permission.Admin,
		description: 'Admin permission',
	};

	let permissionsRepositoryMock: { delete: jest.Mock };
	let getExistingPermissionUseCaseMock: { execute: jest.Mock };
	let useCase: DeletePermissionUseCase;

	beforeEach(() => {
		permissionsRepositoryMock = {
			delete: jest.fn().mockResolvedValue({ affected: 1 }),
		};
		getExistingPermissionUseCaseMock = {
			execute: jest.fn().mockResolvedValue(existingPermission),
		};

		useCase = new DeletePermissionUseCase(
			permissionsRepositoryMock as unknown as PermissionsRepositoryAbstract,
			getExistingPermissionUseCaseMock as unknown as GetExistingPermissionUseCase,
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
	});

	it('should not delete when permission does not exist', async () => {
		getExistingPermissionUseCaseMock.execute.mockRejectedValue(new NotFoundException('Permissão não encontrada'));

		await expect(useCase.execute(permissionId)).rejects.toThrow(NotFoundException);

		expect(permissionsRepositoryMock.delete).not.toHaveBeenCalled();
	});
});
