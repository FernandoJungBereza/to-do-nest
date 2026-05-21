import { PermissionUserEntity } from '@/modules/permission-user/entities/permission-user.entity';
import { TimestampedEntity } from '@/shared/entities/timestamped-entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('permissions')
export class PermissionsEntity extends TimestampedEntity {
	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 255 })
	description: string;

	@Column('varchar', { array: true, default: [] })
	permissionSlug: string[];

	@OneToMany(() => PermissionUserEntity, (permissionUser) => permissionUser.permission)
	permissionUsers: PermissionUserEntity[];
}
