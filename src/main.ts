import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

/* async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('OrdersMS-main');
  await app.listen(envs.port);
  logger.log(`App Running on port ${envs.port}`);
}
bootstrap(); */

//* CON MICRO SERVICIOS
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: envs.port,
    },
  });
  const logger = new Logger('OrdersMS-main');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();
  logger.log(`Orders Microservices Running on port ${envs.port}`);
}
bootstrap();
