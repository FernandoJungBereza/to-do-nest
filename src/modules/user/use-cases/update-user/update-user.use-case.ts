import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';
import { ThrowIfExistUserUseCase } from '../throw-if-exist-user.use-case';

@Injectable()
export class UpdateUserUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
		private readonly throwIfExistUserUseCase: ThrowIfExistUserUseCase,
	) {}

	async execute(id: string, updateUserDto: UpdateUserDto): Promise<void> {
		const user = await this.getExistingUserUseCase.execute({
			where: { id },
		});

		if (updateUserDto.email !== user.email) {
			await this.throwIfExistUserUseCase.execute({
				where: { email: updateUserDto.email },
			});
		}

		await this.userRepository.update(user.id, updateUserDto);
	}
}
