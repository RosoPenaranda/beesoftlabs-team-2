import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from 'src/database/entities/service.entity';
import { User } from 'src/database/entities/user.entity';
import { Order } from '../../database/entities/order.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { ServiceService } from '../service/service.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger('OrderService');

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly serviceService: ServiceService,
  ) {}

  async create(order: CreateOrderDto, customer: User) {
    try {
      const { services_id, ...orderData } = order;
      const newOrder = await this.orderRepo.create(orderData);
      const services: Service[] = [];

      for (const serviceId of services_id) {
        const foundService = await this.serviceService.findById(serviceId);
        services.push(foundService);
      }

      newOrder.customer = customer;
      newOrder.services = services;
      return await this.orderRepo.save(newOrder);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async findAll() {
    try {
      const orders = await this.orderRepo.find();
      return orders;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error finding orders');
    }
  }

  async findById(id: string) {
    try {
      const order = await this.orderRepo.findOne({ where: { id: id } });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return order;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error finding order');
    }
  }

  async findByUserId(customerId: string) {
    try {
      const orders = await this.orderRepo.find({
        where: { customer: { id: customerId } },
      });
      return orders;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error finding order');
    }
  }

  async updateById(updateOrder: UpdateOrderDto, id: string) {
    try {
      const oldOrder = await this.orderRepo.findOne({ where: { id: id } });
      if (!oldOrder) {
        throw new NotFoundException('Order not found');
      }
      if (updateOrder.services_id) {
        const { services_id, ...orderData } = updateOrder;
        const services: Service[] = [];

        for (const serviceId of services_id) {
          const foundService = await this.serviceService.findById(serviceId);
          services.push(foundService);
        }

        const order = { ...oldOrder, orderData, services };
        return await this.orderRepo.save(order);
      }
      const order = { ...oldOrder, ...updateOrder };
      return await this.orderRepo.save(order);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error updating order');
    }
  }

  async removeById(id: string) {
    try {
      const deleteOrder = await this.orderRepo.findOne({ where: { id } });
      if (!deleteOrder) {
        this.logger.error('Order not found, verify the information');
        throw new NotFoundException('Order not found');
      }
      await this.orderRepo.delete(id);
      return deleteOrder;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error removing order');
    }
  }
}
