import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { ToDoListEntity } from './entities/to-do-list.entity';
import { ToDoListRepository } from './repositories/to-do-list.repository';
import { ToDoListRepositoryAbstract } from './repositories/to-do-list.repository.abstract';
import { DeleteToDoListController } from './use-cases/delete-to-do-list/delete-to-do-list.controller';
import { DeleteToDoListUseCase } from './use-cases/delete-to-do-list/delete-to-do-list.use-case';
import { GetExistingToDoListUseCase } from './use-cases/get-existing-to-do-list.use-case';
import { GetOneToDoListByIdController } from './use-cases/get-one-to-do-list-by-id/get-one-to-do-list-by-id.controller';
import { GetOneToDoListByIdUseCase } from './use-cases/get-one-to-do-list-by-id/get-one-to-do-list-by-id.use-case';
import { GetPaginatedToDoListByCurrentUserController } from './use-cases/get-paginated-to-do-list-by-current-user/get-paginated-to-do-list-by-current-user.controller';
import { GetPaginatedToDoListByCurrentUserUseCase } from './use-cases/get-paginated-to-do-list-by-current-user/get-paginated-to-do-list-by-current-user.use-case';
import { GetPaginatedToDoListController } from './use-cases/get-paginated-to-do-list/get-paginated-to-do-list.controller';
import { GetPaginatedToDoListUseCase } from './use-cases/get-paginated-to-do-list/get-paginated-to-do-list.use-case';
import { PostToDoListController } from './use-cases/post-to-do-list/post-to-do-list.controller';
import { PostToDoListUseCase } from './use-cases/post-to-do-list/post-to-do-list.use-case';
import { ThrowIfExistToDoListUseCase } from './use-cases/throw-if-exist-to-do-list.use-case';
import { UpdateToDoListController } from './use-cases/update-to-do-list/update-to-do-list.controller';
import { UpdateToDoListUseCase } from './use-cases/update-to-do-list/update-to-do-list.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([ToDoListEntity, UserEntity]), UserModule],
	controllers: [
		GetPaginatedToDoListController,
		GetPaginatedToDoListByCurrentUserController,
		GetOneToDoListByIdController,
		PostToDoListController,
		DeleteToDoListController,
		UpdateToDoListController,
	],
	providers: [
		GetOneToDoListByIdUseCase,
		PostToDoListUseCase,
		GetPaginatedToDoListUseCase,
		GetPaginatedToDoListByCurrentUserUseCase,
		GetExistingToDoListUseCase,
		UpdateToDoListUseCase,
		ThrowIfExistToDoListUseCase,
		DeleteToDoListUseCase,
		{
			provide: ToDoListRepositoryAbstract,
			useClass: ToDoListRepository,
		},
	],
})
export class ToDoListModule {}
