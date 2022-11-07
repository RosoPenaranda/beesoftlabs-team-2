import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/*import { DemoModule } from './components/demo/app.module';*/
import { AppConfigModule } from './config/app/config.module';
import { DatabaseConfigModule } from './config/database/config.module';
import { TypeOrmConfigModule } from './config/typeorm/typeorm.module';
import { AddressModule } from './components/address/address.module';
import { CommentModule } from './components/comment/comment.module';
import { OrderModule } from './components/order/order.module';
import { User } from "./database/entities/user.entity";
import { Address } from "./database/entities/address.entity";
import { Comment } from "./database/entities/comment.entity";
import { Order } from "./database/entities/order.entity";
import { Pet } from "./database/entities/pet.entity";
import { Service } from "./database/entities/service.entity";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User, Address, Comment, Order, Pet, Service]),
    DatabaseConfigModule,
    AppConfigModule,
    /*DemoModule,*/
    AddressModule,
    CommentModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
