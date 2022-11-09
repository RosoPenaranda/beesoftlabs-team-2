import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmConfigModule } from "../../config/typeorm/typeorm.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Service } from "../../database/entities/service.entity";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Service]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
