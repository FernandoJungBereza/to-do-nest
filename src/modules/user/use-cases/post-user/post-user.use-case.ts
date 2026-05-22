import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PostUserDto } from '../../dtos/post-user.dto';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';
import { ThrowIfExistUserUseCase } from '../throw-if-exist-user.use-case';

@Injectable()
export class PostUserUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly throwIfExistUserUseCase: ThrowIfExistUserUseCase,
	) {}

	async execute(postUserDto: PostUserDto): Promise<void> {
		const passwordHash = await hash(postUserDto.password, 10);

		await this.throwIfExistUserUseCase.execute({
			where: {
				email: postUserDto.email,
			},
		});

		const user = await this.userRepository.create({
			...postUserDto,
			password: passwordHash,
		});

		await this.userRepository.save(user);
	}
}
