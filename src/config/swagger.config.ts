import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { EnvService } from './env';

export function setupSwagger(app: INestApplication, env: EnvService): void {
	if (!env.isDevelopment) return;

	const config = new DocumentBuilder()
		.setTitle('To Do Nest API')
		.setDescription('Documentação da API seguindo o padrão arquitetural Pormade.')
		.setVersion('1.0.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, document, {
		jsonDocumentUrl: 'api-json',
	});
}
