import { DeleteResult, FindOneOptions } from 'typeorm';

import { OutputGetPermissionDto } from '../dtos/output-get-permission.dto';
import { PermissionsEntity } from '../entities/permissions.entity';

export abstract class PermissionsRepositoryAbstract {
	abstract findAll(): Promise<OutputGetPermissionDto[]>;
	abstract findOne(criteria: FindOneOptions<PermissionsEntity>): Promise<OutputGetPermissionDto | null>;
	abstract create(permissions: PermissionsEntity): Promise<PermissionsEntity>;
	abstract delete(id: string): Promise<DeleteResult>;
}
