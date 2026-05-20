import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoListEntity } from './entities/to-do-list.entity';
import { GetAllToDoListController } from './use-cases/get-all-to-do-list/get-all-to-do-list.controller';
import { GetAllToDoListUseCase } from './use-cases/get-all-to-do-list/get-all-to-do-list.use-case';
import { PostToDoListController } from './use-cases/post-to-do-list/post-to-do-list.controller';
import { PostToDoListUseCase } from './use-cases/post-to-do-list/post-to-do-list.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoListEntity])],
  controllers: [PostToDoListController, GetAllToDoListController],
  providers: [PostToDoListUseCase, GetAllToDoListUseCase],
})
export class ToDoListModule {}
