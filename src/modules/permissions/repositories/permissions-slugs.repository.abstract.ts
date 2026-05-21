import { PermissionsSlugsEntity } from '../entities/permissions-slugs.entity';

export abstract class PermissionsSlugsRepositoryAbstract {
	abstract findAllRegisteredSlugs(): Promise<string[]>;
	abstract findBySlugs(slugs: string[]): Promise<PermissionsSlugsEntity[]>;
	abstract slugExists(slug: string): Promise<boolean>;
	abstract createForPermission(permissionId: string, slugs: string[]): Promise<void>;
}
