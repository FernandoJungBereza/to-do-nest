export interface PostToDoListDtoInterface {
  title: string;
  description?: string;
  completed?: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
