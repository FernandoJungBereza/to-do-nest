import { NotFoundException } from '@nestjs/common';
import { GetExistingPermissionUseCase } from '../get-existing-permission.use-case';
import { FindOneByIdPermissionUseCase } from './find-one-by-id-permission.use-case';

describe('FindOneByIdPermissionUseCase', () => {
	const permissionId = 'permission-id';

	let getExistingPermissionUseCaseMock: { execute: jest.Mock };
	let useCase: FindOneByIdPermissionUseCase;

	beforeEach(() => {
		getExistingPermissionUseCaseMock = {
			execute: jest.fn(),
		};
		useCase = new FindOneByIdPermissionUseCase(
			getExistingPermissionUseCaseMock as unknown as GetExistingPermissionUseCase,
		);
	});

	it('should be defined', () => {
		expect(useCase).toBeDefined();
	});

	it('should find a permission by id', async () => {
		await useCase.execute(permissionId);

		expect(getExistingPermissionUseCaseMock.execute).toHaveBeenCalledWith({
			where: { id: permissionId },
		});
	});

	it('should not find a permission by id', async () => {
		getExistingPermissionUseCaseMock.execute.mockRejectedValue(new NotFoundException('Permissão não encontrada'));

		await expect(useCase.execute(permissionId)).rejects.toThrow(NotFoundException);
		expect(getExistingPermissionUseCaseMock.execute).toHaveBeenCalledWith({
			where: { id: permissionId },
		});
	});
});
