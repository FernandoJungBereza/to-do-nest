import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UpdateUserPasswordDto } from '../../dtos/update-user-password.dto';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class UpdateUserPasswordUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
	) {}

	async execute(id: string, updateUserPasswordDto: UpdateUserPasswordDto): Promise<void> {
		const user = await this.getExistingUserUseCase.execute({
			where: { id },
		});

		const isOldPasswordValid = await compare(updateUserPasswordDto.oldPassword, user.password);

		if (!isOldPasswordValid) {
			throw new UnauthorizedException('Old password is incorrect');
		}

		if (updateUserPasswordDto.password !== updateUserPasswordDto.confirmPassword) {
			throw new BadRequestException('Password and confirm password do not match');
		}

		const hashedPassword = await hash(updateUserPasswordDto.password, 10);
		await this.userRepository.updatePassword(user.id, hashedPassword);
	}
}
