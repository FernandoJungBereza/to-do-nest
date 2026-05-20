import { ToDoListEntityInterface } from '../interfaces/to-do-list-entity.interface';

export abstract class ToDoListRepositoryAbstract {
  abstract findOne(id: string): Promise<ToDoListEntityInterface>;
  abstract findAll(): Promise<ToDoListEntityInterface[]>;
  abstract create(toDoList: ToDoListEntityInterface): Promise<void>;
  abstract update(id: string, toDoList: ToDoListEntityInterface): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
