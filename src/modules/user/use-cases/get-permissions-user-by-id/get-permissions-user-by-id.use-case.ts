import { Injectable } from '@nestjs/common';
import { OutputUserPermissionsDto } from '../../dtos/output-user-permissions.dto';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class GetPermissionsUserIdUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
	) {}

	async execute(userId: string): Promise<OutputUserPermissionsDto> {
		await this.getExistingUserUseCase.execute({ where: { id: userId } });
		return await this.userRepository.getPermissionsUserId(userId);
	}
}
