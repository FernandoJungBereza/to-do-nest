import { Injectable } from '@nestjs/common';
import { GetExistingToDoListUseCase } from '../get-existing-to-do-list.use-case';
import { ToDoListRepositoryAbstract } from '../../repositories/to-do-list.repository.abstract';

@Injectable()
export class DeleteToDoListUseCase {
	constructor(
		private readonly toDoListRepository: ToDoListRepositoryAbstract,
		private readonly getExistingToDoListUseCase: GetExistingToDoListUseCase,
	) {}

	async execute(id: string): Promise<void> {
		const toDoList = await this.getExistingToDoListUseCase.execute({
			where: { id },
		});

		await this.toDoListRepository.delete(toDoList.id);
	}
}
