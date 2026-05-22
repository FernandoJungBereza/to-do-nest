import { UserEntity } from '@/modules/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionUserEntity } from './entities/permission-user.entity';
import { PermissionUserRepository } from './repositories/permission-user.repository';
import { PermissionUserRepositoryAbstract } from './repositories/permission-user.repository.abstract';

@Module({
	imports: [TypeOrmModule.forFeature([PermissionUserEntity, UserEntity])],
	providers: [
		{
			provide: PermissionUserRepositoryAbstract,
			useClass: PermissionUserRepository,
		},
	],
	exports: [PermissionUserRepositoryAbstract],
})
export class PermissionUserModule {}
