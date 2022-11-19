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
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from 'src/auth/decorators/auth-role.decorator';
import { UserRole } from 'src/utils/enums';
import { ResponseOrderWithRelationsDto } from './dto/response-orders-with-relations.dto';
import { ResponseOrderWithoutRelationsDto } from './dto/response-order-without-relations.dto';

@ApiTags('Orders')
@ApiBearerAuth('JWTAuth')
@Controller('orders')
@UseGuards(AuthGuard('JwtHeaderStrategy'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiResponse({
    type: ResponseOrderWithRelationsDto,
    description: 'Order successfully created',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error creating order' })
  @ApiOperation({
    summary: 'Create a new order',
  })
  @Post()
  createOrder(@Body() newOrder: CreateOrderDto, @GetUser() owner: User) {
    return this.orderService.create(newOrder, owner);
  }

  @ApiOperation({
    summary: 'Find all stored orders',
  })
  @ApiResponse({
    type: [ResponseOrderWithoutRelationsDto],
    description: 'Array of orders',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding orders' })
  @AuthRole(UserRole.ADMIN)
  @Get()
  getAllOrders() {
    return this.orderService.findAll();
  }

  @ApiOperation({
    summary: 'Find an order using its ID',
  })
  @ApiParam({ name: 'id', description: 'ID of the order' })
  @ApiResponse({
    type: ResponseOrderWithRelationsDto,
    description: 'Returns the order',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding order' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @Get('/:id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @ApiOperation({
    summary: 'Find all orders using its owner ID',
  })
  @ApiParam({ name: 'customerId', description: 'ID of the user' })
  @ApiResponse({
    type: [ResponseOrderWithoutRelationsDto],
    description:
      'Returns an array with the orders that belong to the same user',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding orders' })
  @Get('customerId/:customerId')
  getOrdersByUserId(@Param('customerId') customerId: string) {
    return this.orderService.findById(customerId);
  }

  @ApiOperation({
    summary: 'Find an order using its ID and update its properties',
  })
  @ApiParam({ name: 'id', description: 'ID of the order' })
  @ApiResponse({
    type: ResponseOrderWithoutRelationsDto,
    description: 'Returns the updated order',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error updating order' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @AuthRole(UserRole.ADMIN)
  @Patch('/:id')
  updateOrder(@Body() newCommentDto: UpdateOrderDto, @Param('id') id: string) {
    return this.orderService.updateById(newCommentDto, id);
  }

  @ApiOperation({
    summary: 'Find an order using its ID and deletes it',
  })
  @ApiParam({ name: 'id', description: 'ID of the order' })
  @ApiResponse({
    type: ResponseOrderWithoutRelationsDto,
    description: 'Returns the removed order',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error deleting order' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @AuthRole(UserRole.ADMIN)
  @Delete('/:id')
  deleteOrderById(@Param('id') id: string) {
    return this.orderService.removeById(id);
  }
}
