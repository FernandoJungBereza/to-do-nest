import { Injectable } from '@nestjs/common';
import { UserRepositoryAbstractResponse } from '../../interfaces/user-repository-abstract-response';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class GetOneUserByIdUseCase {
	constructor(private readonly getExistingUserUseCase: GetExistingUserUseCase) {}

	async execute(id: string): Promise<Pick<UserRepositoryAbstractResponse, 'id' | 'name' | 'email'>> {
		const user = await this.getExistingUserUseCase.execute({
			where: { id: id },
		});

		return {
			id: user.id,
			name: user.name,
			email: user.email,
		};
	}
}
