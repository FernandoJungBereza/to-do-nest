import { UserEntity } from '@/modules/user/entities/user.entity';
import { BaseEntity } from '@/shared/entities/base-entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { ToDoListEntityInterface } from '../interfaces/to-do-list-entity.interface';

@Entity('to_do_lists')
export class ToDoListEntity
  extends BaseEntity
  implements ToDoListEntityInterface
{
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.toDoLists)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
