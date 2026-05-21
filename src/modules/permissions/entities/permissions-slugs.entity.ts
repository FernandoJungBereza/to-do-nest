import { BaseEntity } from '@/shared/entities/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PermissionsEntity } from './permissions.entity';

@Entity('permissions_slugs')
export class PermissionsSlugsEntity extends BaseEntity {
	@Column({ type: 'varchar', length: 255 })
	name: string;

	@ManyToOne(() => PermissionsEntity, (permission) => permission.permissionSlugs)
	@JoinColumn({ name: 'permission' })
	permission: PermissionsEntity;
}
