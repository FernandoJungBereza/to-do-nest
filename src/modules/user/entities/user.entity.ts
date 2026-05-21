import { PermissionsEntity } from '@/modules/permissions/entities/permissions.entity';
import { ToDoListEntity } from '@/modules/to-do-list/entities/to-do-list.entity';
import { TimestampedEntity } from '@/shared/entities/timestamped-entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { UserEntityInterface } from '../interfaces/user-entity.interface';

@Entity('users')
export class UserEntity extends TimestampedEntity implements UserEntityInterface {
	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 255 })
	email: string;

	@Column({ type: 'varchar', length: 255 })
	password: string;

	@OneToMany(() => ToDoListEntity, (toDoList) => toDoList.user)
	toDoLists: ToDoListEntity[];

	@ManyToMany(() => PermissionsEntity, (permission) => permission.users)
	@JoinTable({ name: 'users_permissions' })
	permissions: PermissionsEntity[];
}
