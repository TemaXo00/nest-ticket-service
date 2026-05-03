import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { swaggerEventsConfig, swaggerEventsUIconfig } from '@org/common';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerEventsConfig,
  );
  SwaggerModule.setup('docs', app, swaggerDocument, swaggerEventsUIconfig);

  app.useGlobalPipes(new ValidationPipe());

  const port = 3000
  await app.listen(port);
}

void bootstrap();
