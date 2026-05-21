import { UserEntity } from '@/modules/user/entities/user.entity';
import { TimestampedEntity } from '@/shared/entities/timestamped-entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('permissions')
export class PermissionsEntity extends TimestampedEntity {
	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 255 })
	description: string;

	@ManyToMany(() => UserEntity, (user) => user.permissions)
	users: UserEntity[];
}
