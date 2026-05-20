import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class SoftDeleteUserUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
	) {}

	async execute(id: string): Promise<void> {
		const user = await this.getExistingUserUseCase.execute({
			where: { id },
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		await this.userRepository.softDelete(id);
	}
}
