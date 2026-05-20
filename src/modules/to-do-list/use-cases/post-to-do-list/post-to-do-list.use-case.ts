import { GetOneUserByIdUseCase } from '@/modules/user/use-cases/get-one-user-by-id/get-one-user-by-id.use-case';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PostToDoListDto } from '../../dtos/post-to-do-list.dto';
import { ToDoListRepositoryAbstract } from '../../repositories/to-do-list.repository.abstract';
import { ThrowIfExistToDoListUseCase } from '../throw-if-exist-to-do-list.use-case';

@Injectable()
export class PostToDoListUseCase {
	constructor(
		private readonly toDoListRepository: ToDoListRepositoryAbstract,
		private readonly throwIfExistToDoListUseCase: ThrowIfExistToDoListUseCase,
		private readonly getUserByIdUseCase: GetOneUserByIdUseCase,
	) {}

	async execute(postToDoListDto: PostToDoListDto): Promise<void> {
		await this.throwIfExistToDoListUseCase.execute({
			where: {
				userId: postToDoListDto.userId,
			},
		});

		const user = await this.getUserByIdUseCase.execute(postToDoListDto.userId);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		const toDoList = await this.toDoListRepository.create({
			...postToDoListDto,
		});

		await this.toDoListRepository.save(toDoList);
	}
}
