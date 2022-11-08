import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
<<<<<<< HEAD
import { TypeOrmConfigModule } from "../../config/typeorm/typeorm.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pet } from "../../database/entities/pet.entity";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Pet]),
  ],
=======

@Module({
>>>>>>> d5c8368 (user component finished)
  controllers: [PetController],
  providers: [PetService]
})
export class PetModule {}
