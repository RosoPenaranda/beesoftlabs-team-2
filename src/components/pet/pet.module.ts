import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmConfigModule } from '../../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from '../../database/entities/pet.entity';
import { DatabaseConfigModule } from 'src/config/database/config.module';
import { AppConfigModule } from 'src/config/app/config.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Pet]),
    DatabaseConfigModule,
    AppConfigModule,
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
