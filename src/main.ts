import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('OrdersMS-main');
  await app.listen(envs.port);
  logger.log(`App Running on port ${envs.port}`);
}
bootstrap();
