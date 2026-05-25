import { UserRepositoryAbstract } from '@/modules/user/repositories/user.repository.abstract';
import { GetExistingUserUseCase } from '@/modules/user/use-cases/get-existing-user.use-case';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LogoutUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
	) {}

	async execute(userId: string): Promise<void> {
		const user = await this.getExistingUserUseCase.execute({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}
	}
}
