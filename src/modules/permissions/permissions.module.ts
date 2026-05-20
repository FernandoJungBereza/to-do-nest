import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { PermissionsEntity } from './entities/permissions.entity';

@Module({
	imports: [TypeOrmModule.forFeature([PermissionsEntity, UserEntity]), UserModule],
	controllers: [],
	providers: [],
})
export class PermissionsModule {}
