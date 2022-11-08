import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
<<<<<<< HEAD
import { TypeOrmConfigModule } from "../../config/typeorm/typeorm.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Service } from "../../database/entities/service.entity";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Service]),
  ],
=======

@Module({
>>>>>>> d5c8368 (user component finished)
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
