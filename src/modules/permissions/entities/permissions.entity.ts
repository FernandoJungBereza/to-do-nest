import { TimestampedEntity } from '@/shared/entities/timestamped-entity';
import { Column, Entity } from 'typeorm';

@Entity('permissions')
export class PermissionsEntity extends TimestampedEntity {
	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 255 })
	description: string;
}
