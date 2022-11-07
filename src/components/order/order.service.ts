import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../../database/entities/order.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async createOrder(orderDto: CreateOrderDto) {
    try {
      return await this.orderRepo.save(orderDto);
    } catch (e) {
      throw new HttpException(
        'Error creating the order',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getAllOrders() {
    try {
      return await this.orderRepo.find();
    } catch (e) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  async getOrderById(id: string) {
    try {
      return await this.orderRepo.findOne({ where: { id } });
    } catch (e) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateOrder(newOrder: UpdateOrderDto, id: string) {
    try {
      const oldOrder = await this.orderRepo.findOne({ where: { id } });

      if (!oldOrder) {
        return new HttpException(
          'Order cant be updated',
          HttpStatus.BAD_GATEWAY,
        );
      }

      const orderDto = Object.assign(oldOrder, newOrder);

      return await this.orderRepo.save(orderDto);
    } catch (e) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteOrderById(id: string) {
    const deleteOrder = await this.orderRepo.findOne({ where: { id } });

    if (!deleteOrder)
      return new HttpException('Remove failed', HttpStatus.NOT_FOUND);

    await this.orderRepo.delete(id);

    return deleteOrder;
  }
}
