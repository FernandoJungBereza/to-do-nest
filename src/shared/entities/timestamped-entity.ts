import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { TimestampedEntityInterface } from '../interfaces/timestamped-entity.interface';
import { BaseEntity } from './base-entity';

export abstract class TimestampedEntity extends BaseEntity implements TimestampedEntityInterface {
	@CreateDateColumn({
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
		name: 'created_at',
	})
	createdAt!: Date;

	@UpdateDateColumn({
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
		name: 'updated_at',
	})
	updatedAt!: Date;

	@DeleteDateColumn({
		type: 'timestamp with time zone',
		name: 'deleted_at',
	})
	deletedAt?: Date;
}
