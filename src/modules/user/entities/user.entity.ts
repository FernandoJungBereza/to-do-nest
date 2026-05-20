import { BaseEntity } from '@/shared/entities/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntityInterface } from '../interfaces/user-entity.interface';
import { ToDoListEntity } from '@/modules/to-do-list/entities/to-do-list.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements UserEntityInterface {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @OneToMany(() => ToDoListEntity, (toDoList) => toDoList.user)
  toDoLists: ToDoListEntity[];
}
