import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionUserEntity } from './entities/permission-user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([PermissionUserEntity])],
	controllers: [],
	providers: [],
	exports: [],
})
export class PermissionUserModule {}
