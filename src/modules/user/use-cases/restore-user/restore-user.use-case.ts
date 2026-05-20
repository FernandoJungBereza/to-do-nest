import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';
import { GetExistingDeletedUserUseCase } from '../get-existing-deleted-user.use-case';

@Injectable()
export class RestoreUserUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly getExistingDeletedUserUseCase: GetExistingDeletedUserUseCase,
	) {}

	async execute(id: string): Promise<void> {
		const user = await this.getExistingDeletedUserUseCase.execute({
			where: { id },
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		await this.userRepository.restore(id);
	}
}
