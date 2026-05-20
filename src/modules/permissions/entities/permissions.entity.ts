import { UserEntity } from '@/modules/user/entities/user.entity';
import { TimestampedEntity } from '@/shared/entities/timestamped-entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';

export class PermissionsEntity extends TimestampedEntity {
	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 255 })
	description: string;

	@ManyToOne(() => UserEntity, (user) => user.permissions)
	@JoinColumn({ name: 'userId' })
	user: UserEntity;
}
