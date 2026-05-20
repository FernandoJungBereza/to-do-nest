import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoListEntity } from './entities/to-do-list.entity';
import { DeleteToDoListController } from './use-cases/delete-to-do-list/delete-to-do-list.controller';
import { DeleteToDoListUseCase } from './use-cases/delete-to-do-list/delete-to-do-list.use-case';
import { GetAllToDoListController } from './use-cases/get-all-to-do-list/get-all-to-do-list.controller';
import { GetAllToDoListUseCase } from './use-cases/get-all-to-do-list/get-all-to-do-list.use-case';
import { GetExistingToDoListUseCase } from './use-cases/get-existing-to-do-list.use-case';
import { GetOneToDoListByIdController } from './use-cases/get-one-to-do-list-by-id/get-one-to-do-list-by-userId.controller';
import { GetOneToDoListByIdUseCase } from './use-cases/get-one-to-do-list-by-id/get-one-to-do-list-by-userId.use-case';
import { PostToDoListController } from './use-cases/post-to-do-list/post-to-do-list.controller';
import { PostToDoListUseCase } from './use-cases/post-to-do-list/post-to-do-list.use-case';
import { ThrowIfExistToDoListUseCase } from './use-cases/throw-if-exist-to-do-list.use-case';
import { UpdateToDoListController } from './use-cases/update-to-do-list/update-to-do-list.controller';
import { UpdateToDoListUseCase } from './use-cases/update-to-do-list/update-to-do-list.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoListEntity])],
  controllers: [
    GetAllToDoListController,
    GetOneToDoListByIdController,
    PostToDoListController,
    DeleteToDoListController,
    UpdateToDoListController,
  ],
  providers: [
    GetOneToDoListByIdUseCase,
    PostToDoListUseCase,
    GetAllToDoListUseCase,
    GetExistingToDoListUseCase,
    UpdateToDoListUseCase,
    ThrowIfExistToDoListUseCase,
    DeleteToDoListUseCase,
  ],
})
export class ToDoListModule {}
