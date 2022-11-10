import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../../database/entities/order.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger('OrderService');

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async create(orderDto: CreateOrderDto) {
    try {
      return await this.orderRepo.save(orderDto);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Error creating the order',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findAll() {
    try {
      return await this.orderRepo.find();
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  async findById(id: string) {
    try {
      return await this.orderRepo.findOne({ where: { id } });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateById(id: string, body: Partial<UpdateOrderDto>) {
    try {
      const oldOrder = await this.orderRepo.findOne({ where: { id } });

      if (!oldOrder) {
        this.logger.error('Order not found, verify the information');
        throw new HttpException(
          'Order cant be updated',
          HttpStatus.BAD_GATEWAY,
        );
      }
      const orderDto = Object.assign(oldOrder, body);

      return await this.orderRepo.save(orderDto);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  async removeById(id: string) {
    try {
      const deleteOrder = await this.orderRepo.findOne({ where: { id } });
      if (!deleteOrder) {
        this.logger.error('Order not found, verify the information');
        throw new HttpException('Remove failed', HttpStatus.NOT_FOUND);
      }
      await this.orderRepo.delete(id);
      return deleteOrder;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }
}
