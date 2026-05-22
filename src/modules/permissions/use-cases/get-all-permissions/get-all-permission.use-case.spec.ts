import { PermissionsRepositoryAbstract } from '../../repositories/permissions.repository.abstratct';
import { GetAllPermissionUseCase } from './get-all-permission.use-case';

describe('GetAllPermissionUseCase', () => {
	let permissionsRepositoryMock: { findAll: jest.Mock };
	let useCase: GetAllPermissionUseCase;

	beforeEach(() => {
		permissionsRepositoryMock = {
			findAll: jest.fn(),
		};
		useCase = new GetAllPermissionUseCase(permissionsRepositoryMock as unknown as PermissionsRepositoryAbstract);
	});

	it('should be defined', () => {
		expect(useCase).toBeDefined();
	});

	it('should get all permissions', async () => {
		await useCase.execute();
		expect(permissionsRepositoryMock.findAll).toHaveBeenCalled();
	});
});
