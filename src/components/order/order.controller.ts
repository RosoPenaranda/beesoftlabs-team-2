import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/createOrder')
  createOrder(@Body() orderDto: CreateOrderDto) {
    return this.orderService.createOrder(orderDto);
  }

  @Get('/getComments')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('/getComment/:id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Patch('/updateComment/:id')
  updateOrder(@Body() newCommentDto: UpdateOrderDto, @Param('id') id: string) {
    return this.orderService.updateOrder(newCommentDto, id);
  }

  @Delete('/deleteComment/:id')
  deleteOrderById(@Param('id') id: string) {
    return this.orderService.deleteOrderById(id);
  }
}
