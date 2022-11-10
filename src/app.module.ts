import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoogleStrategy } from './auth/utils/google.strategy';

import { AppConfigModule } from './config/app/config.module';
import { DatabaseConfigModule } from './config/database/config.module';
import { TypeOrmConfigModule } from './config/typeorm/typeorm.module';
import { AddressModule } from './components/address/address.module';
import { CommentModule } from './components/comment/comment.module';
import { OrderModule } from './components/order/order.module';
import { User } from './database/entities/user.entity';
import { Address } from './database/entities/address.entity';
import { Comment } from './database/entities/comment.entity';
import { Order } from './database/entities/order.entity';
import { Pet } from './database/entities/pet.entity';
import { Service } from './database/entities/service.entity';
import { ServiceModule } from './components/service/service.module';
import { PetModule } from './components/pet/pet.module';
import { UserModule } from './components/user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from "./auth/auth.service";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User, Address, Comment, Order, Pet, Service]),
    DatabaseConfigModule,
    AppConfigModule,
    PassportModule.register({
      session: true,
    }),
    AddressModule,
    CommentModule,
    OrderModule,
    UserModule,
    PetModule,
    ServiceModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    GoogleStrategy,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    }
  ],
})
export class AppModule {}
