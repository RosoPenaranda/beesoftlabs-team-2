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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from 'src/auth/decorators/auth-role.decorator';
import { UserRole } from 'src/utils/enums';

@ApiTags('Orders')
@ApiBearerAuth('JWTAuth')
@Controller('orders')
@UseGuards(AuthGuard('JwtHeaderStrategy'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() newOrder: CreateOrderDto, @GetUser() owner: User) {
    return this.orderService.create(newOrder, owner);
  }

  @AuthRole(UserRole.ADMIN)
  @Get()
  getAllOrders() {
    return this.orderService.findAll();
  }

  @Get('/:id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @Get('customerId/:customerId')
  getOrdersByUserId(@Param('customerId') customerId: string) {
    return this.orderService.findById(customerId);
  }

  @AuthRole(UserRole.ADMIN)
  @Patch('/:id')
  updateOrder(@Body() newCommentDto: UpdateOrderDto, @Param('id') id: string) {
    return this.orderService.updateById(newCommentDto, id);
  }

  @AuthRole(UserRole.ADMIN)
  @Delete('/:id')
  deleteOrderById(@Param('id') id: string) {
    return this.orderService.removeById(id);
  }
}
