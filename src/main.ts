import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { EnvService } from './config/env';
import { setupSwagger } from './config/swagger.config';

async function bootstrap(): Promise<void> {
  console.log(process.env.JWT_SECRET);
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  setupSwagger(app, env);

  await app.listen(env.port);
}

void bootstrap();
