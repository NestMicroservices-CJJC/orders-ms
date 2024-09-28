import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { OrderPaginationDto } from './dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Orders Database Connected');
  }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const newOrder = await this.order.create({ data: createOrderDto });
      return newOrder;
    } catch (error) {
      throw new RpcException({
        message: `Can't save Record`,
        error,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {
    const { page, limit, status } = orderPaginationDto;
    const totalRegs = await this.order.count({});
    const totalPages = Math.ceil(totalRegs / limit);
    const orders = await this.order.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        status: status,
      },
    });
    if (!orders) {
      // throw new BadRequestException('No registers on DataBase');
      throw new RpcException({
        message: 'No registers on DataBase',
        status: HttpStatus.NOT_FOUND,
      });
    }
    return {
      orders,
      meta: {
        page,
        totalRegs,
        totalPages,
      },
    };
  }

  async findOne(id: string) {
    const order = await this.order.findFirst({ where: { id } });
    if (!order) {
      // throw new NotFoundException(`Order with id: ${id} Not Found!`);
      throw new RpcException({
        message: `Order with id: ${id} Not Found`,
        status: HttpStatus.NOT_FOUND,
      });
    }
    return order;
  }

  async changeOrderStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeOrderStatusDto;
    const order = await this.findOne(id);
    if (order.status === status) {
      return order;
    }
    return this.order.update({ where: { id }, data: { status } });
  }
}
