import { BaseEntity } from '@/shared/entities/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PermissionsEntity } from './permissions.entity';

@Entity('permissions_slugs')
export class PermissionsSlugsEntity extends BaseEntity {
	@Column({ type: 'uuid' })
	permissionId: string;

	@Column({ type: 'varchar', length: 255, unique: true })
	slug: string;

	@ManyToOne(() => PermissionsEntity, (permission) => permission.permissionSlugs)
	@JoinColumn({ name: 'permissionId' })
	permission: PermissionsEntity;
}
