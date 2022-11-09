import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() orderDto: CreateOrderDto) {
    return this.orderService.create(orderDto);
  }

  @Get()
  getAllOrders() {
    return this.orderService.findAll();
  }

  @Get('/:id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @Patch('/:id')
  updateOrder(
    @Param('id') id: string,
    @Body() newOrderDto: Partial<UpdateOrderDto>,
  ) {
    return this.orderService.updateById(id, newOrderDto);
  }

  @Put('/:id')
  putAddress(
    @Param('id') id: string,
    @Body() newOrder: Required<UpdateOrderDto>,
  ) {
    return this.orderService.updateById(id, newOrder);
  }

  @Delete('/:id')
  deleteOrderById(@Param('id') id: string) {
    return this.orderService.removeById(id);
  }
}
