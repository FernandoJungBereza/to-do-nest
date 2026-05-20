export interface ToDoListEntityInterface {
	id: string;
	title: string;
	description?: string;
	completed?: boolean;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}
