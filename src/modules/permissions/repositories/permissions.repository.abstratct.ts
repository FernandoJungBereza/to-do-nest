import { DeleteResult } from 'typeorm';
import { PermissionsEntity } from '../entities/permissions.entity';

export abstract class PermissionsRepositoryAbstract {
	abstract findAll(): Promise<PermissionsEntity[]>;
	abstract create(permissions: PermissionsEntity): Promise<PermissionsEntity>;
	abstract delete(id: string): Promise<DeleteResult>;
}
