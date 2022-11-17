import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { User } from 'src/database/entities/user.entity';
import { Service } from 'src/database/entities/service.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@ApiTags('Orders')
@ApiBearerAuth('JWTAuth')
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(
    @Body() newOrder: CreateOrderDto,
    @GetUser() owner: User,
    services: Service[],
  ) {
    return this.orderService.create(newOrder, owner, services);
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
  updateOrder(@Body() newCommentDto: UpdateOrderDto, @Param('id') id: string) {
    return this.orderService.updateById(newCommentDto, id);
  }

  @Delete('/:id')
  deleteOrderById(@Param('id') id: string) {
    return this.orderService.removeById(id);
  }
}
