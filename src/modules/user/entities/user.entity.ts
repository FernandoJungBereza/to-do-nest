import { ToDoListEntity } from '@/modules/to-do-list/entities/to-do-list.entity';
import { TimestampedEntity } from '@/shared/entities/timestamped-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntityInterface } from '../interfaces/user-entity.interface';
import { PermissionUserEntity } from '@/modules/permission-user/entities/permission-user.entity';

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

	@OneToMany(() => PermissionUserEntity, (permissionUser) => permissionUser.user)
	permissionUsers: PermissionUserEntity[];
}
