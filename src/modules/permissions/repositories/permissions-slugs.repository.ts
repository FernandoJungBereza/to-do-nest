import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PermissionsSlugsEntity } from '../entities/permissions-slugs.entity';
import { PermissionsSlugsRepositoryAbstract } from './permissions-slugs.repository.abstract';

@Injectable()
export class PermissionsSlugsRepository implements PermissionsSlugsRepositoryAbstract {
	constructor(
		@InjectRepository(PermissionsSlugsEntity)
		private readonly permissionsSlugsRepository: Repository<PermissionsSlugsEntity>,
	) {}

	async findAllRegisteredSlugs(): Promise<string[]> {
		const rows = await this.permissionsSlugsRepository.find({ select: ['slug'] });

		return rows.map((row) => row.slug);
	}

	async findBySlugs(slugs: string[]): Promise<PermissionsSlugsEntity[]> {
		if (slugs.length === 0) {
			return [];
		}

		return await this.permissionsSlugsRepository.find({
			where: { slug: In(slugs) },
		});
	}

	async slugExists(slug: string): Promise<boolean> {
		return await this.permissionsSlugsRepository.exists({ where: { slug } });
	}

	async save(permissionsSlugs: PermissionsSlugsEntity[]): Promise<void> {
		await this.permissionsSlugsRepository.save(permissionsSlugs);
	}

	async createForPermission(permissionId: string, slugs: string[]): Promise<void> {
		await this.permissionsSlugsRepository.save(
			slugs.map((slug) =>
				this.permissionsSlugsRepository.create({
					permissionId,
					slug,
				}),
			),
		);
	}
}
