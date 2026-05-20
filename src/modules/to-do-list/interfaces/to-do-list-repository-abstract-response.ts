import { UserRepositoryAbstractResponse } from '@/modules/user/interfaces/user-repository-abstract-response';

export interface ToDoListRepositoryAbstractResponse {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: Pick<UserRepositoryAbstractResponse, 'name' | 'email'>;
}
