import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import {
  swaggerTicketsConfig,
  swaggerTicketsUIconfig,
} from '@org/common';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  const config:ConfigService = app.get(ConfigService);

  const rmqUser: string = config.getOrThrow<string>('RABBIT_MQ_USER');
  const rmqPasswd: string = config.getOrThrow<string>('RABBIT_MQ_PASSWORD');
  const rmqHost: string = config.getOrThrow<string>('RABBIT_MQ_HOST');
  const rmqPort: number = config.getOrThrow<number>('RABBIT_MQ_PORT');
  const ticketQueue: string = config.getOrThrow<string>('TICKET_QUEUE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rmqUser}:${rmqPasswd}@${rmqHost}:${rmqPort}`],
      queue: ticketQueue,
      queueOptions: {
        durable: true,
      },
    },
  });

  const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerTicketsConfig,
  );
  SwaggerModule.setup('docs', app, swaggerDocument, swaggerTicketsUIconfig);

  app.useGlobalPipes(new ValidationPipe());

  const port = 3001

  await app.startAllMicroservices()
  await app.listen(port);
}

void bootstrap();
