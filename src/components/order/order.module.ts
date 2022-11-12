import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';

import { TypeOrmConfigModule } from '../../config/typeorm/typeorm.module';
import { DatabaseConfigModule } from '../../config/database/config.module';

import { OrderController } from './order.controller';
import { AppConfigModule } from '../../config/app/config.module';
import { Order } from '../../database/entities/order.entity';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Order]),
    DatabaseConfigModule,
    AppConfigModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
