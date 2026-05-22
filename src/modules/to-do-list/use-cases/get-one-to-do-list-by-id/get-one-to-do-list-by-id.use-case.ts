import { Injectable } from '@nestjs/common';
import { ToDoListEntityInterface } from '../../interfaces/to-do-list-entity.interface';
import { GetExistingToDoListUseCase } from '../get-existing-to-do-list.use-case';

@Injectable()
export class GetOneToDoListByIdUseCase {
	constructor(private readonly getExistingToDoListUseCase: GetExistingToDoListUseCase) {}

	async execute(id: string): Promise<ToDoListEntityInterface | null> {
		const toDoList = await this.getExistingToDoListUseCase.execute({
			where: { id },
		});
		return toDoList;
	}
}
