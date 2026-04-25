import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {SwaggerModule} from "@nestjs/swagger";
import {OpenAPIObject} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

import {AppModule} from './app.module';
import {swaggerOptions} from "./config/swagger/options.config";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const rmqUser = config.getOrThrow<string>("RABBIT_MQ_USER")
  const rmqPasswd = config.getOrThrow<string>("RABBIT_MQ_PASSWORD")
  const ticketQueue = config.getOrThrow<string>("TICKET_QUEUE")

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rmqUser}:${rmqPasswd}@rabbitmq:5672`],
      queue: ticketQueue,
      queueOptions: {
        durable: true,
      }
    }
  })

  const documentFactory = (): OpenAPIObject => SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('docs', app, documentFactory)

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  app.enableCors({
    origin: config.getOrThrow<string>('CORS_CLIENT_ORIGIN'),
    credentials: true,
  })

  await app.listen(3000);
}

void bootstrap();
