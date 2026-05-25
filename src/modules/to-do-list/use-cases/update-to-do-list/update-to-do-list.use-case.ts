import { GetOneUserByIdUseCase } from '@/modules/user/use-cases/get-one-user-by-id/get-one-user-by-id.use-case';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Not } from 'typeorm';
import { UpdateToDoListDto } from '../../dtos/update-to-do-list.dto';
import { GetExistingToDoListUseCase } from '../get-existing-to-do-list.use-case';
import { ThrowIfExistToDoListUseCase } from '../throw-if-exist-to-do-list.use-case';
import { ToDoListRepositoryAbstract } from '../../repositories/to-do-list.repository.abstract';

@Injectable()
export class UpdateToDoListUseCase {
	constructor(
		private readonly toDoListRepository: ToDoListRepositoryAbstract,
		private readonly getExistingToDoListUseCase: GetExistingToDoListUseCase,
		private readonly throwIfExistToDoListUseCase: ThrowIfExistToDoListUseCase,
		private readonly getOneUserByIdUseCase: GetOneUserByIdUseCase,
	) {}

	async execute(id: string, updateToDoListDto: UpdateToDoListDto): Promise<void> {
		const toDoList = await this.getExistingToDoListUseCase.execute({
			where: { id },
		});

		await this.throwIfExistToDoListUseCase.execute({
			where: {
				userId: updateToDoListDto.userId,
				title: updateToDoListDto.title,
				id: Not(toDoList.id),
			},
		});

		const findUser = await this.getOneUserByIdUseCase.execute(updateToDoListDto.userId);

		if (!findUser) {
			throw new NotFoundException('User not found');
		}

		await this.toDoListRepository.update(toDoList.id, {
			...updateToDoListDto,
		});
	}
}
