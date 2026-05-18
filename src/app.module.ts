import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvModule, EnvService } from './config/env';
import { createTypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    EnvModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: createTypeOrmConfig,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
