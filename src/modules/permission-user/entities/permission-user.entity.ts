import { PermissionsEntity } from '@/modules/permissions/entities/permissions.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { TimestampedEntity } from '@/shared/entities/timestamped-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('permission_user')
export class PermissionUserEntity extends TimestampedEntity {
	@Column({ type: 'uuid' })
	permissionId: string;

	@Column({ type: 'uuid' })
	userId: string;

	@ManyToOne(() => PermissionsEntity, (permission) => permission.permissionUsers)
	@JoinColumn({ name: 'permissionId' })
	permission: PermissionsEntity;

	@ManyToOne(() => UserEntity, (user) => user.permissionUsers)
	@JoinColumn({ name: 'userId' })
	user: UserEntity;
}
