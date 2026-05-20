import { UserEntity } from '@/modules/user/entities/user.entity';
import { TimestampedEntity } from '@/shared/entities/timestamped-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('permissions')
export class PermissionsEntity extends TimestampedEntity {
	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 255 })
	description: string;

	@ManyToOne(() => UserEntity, (user) => user.permissions)
	@JoinColumn({ name: 'userId' })
	user: UserEntity;
}
