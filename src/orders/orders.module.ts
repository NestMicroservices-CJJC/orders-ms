import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'src/config';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ClientsModule.register([
      {
        // name: PRODUCT_SERVICE,
        // transport: Transport.TCP,
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: envs.natsServers,
      },
    ]),
  ],
})
export class OrdersModule {}
