import { DeleteResult } from 'typeorm';
import { PermissionsEntity } from '../entities/permissions.entity';
import { OutputGetAllPermissionsDto } from '../dtos/output-get-all-permissions.dto';

export abstract class PermissionsRepositoryAbstract {
	abstract findAll(): Promise<OutputGetAllPermissionsDto[]>;
	abstract create(permissions: PermissionsEntity): Promise<PermissionsEntity>;
	abstract delete(id: string): Promise<DeleteResult>;
}
