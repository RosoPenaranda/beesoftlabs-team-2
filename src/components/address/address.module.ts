import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmConfigModule } from '../../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from '../../config/database/config.module';
import { AppConfigModule } from '../../config/app/config.module';
import { Address } from '../../database/entities/address.entity';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Address]),
    DatabaseConfigModule,
    AppConfigModule,
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
