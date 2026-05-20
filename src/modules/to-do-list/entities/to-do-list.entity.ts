import { UserEntity } from '@/modules/user/entities/user.entity';
import { TimestampedEntity } from '@/shared/entities/timestamped-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ToDoListEntityInterface } from '../interfaces/to-do-list-entity.interface';

@Entity('to_do_lists')
export class ToDoListEntity extends TimestampedEntity implements ToDoListEntityInterface {
	@Column({ type: 'varchar', length: 255 })
	title: string;

	@Column({ type: 'varchar', length: 255 })
	description: string;

	@Column({ type: 'boolean', default: false })
	completed: boolean;

	@Column({ type: 'uuid', nullable: false })
	userId: string;

	@ManyToOne(() => UserEntity, (user) => user.toDoLists)
	@JoinColumn({ name: 'userId' })
	user: UserEntity;
}
