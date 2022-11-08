<<<<<<< HEAD
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { User } from 'src/database/entities/user.entity';
=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
>>>>>>> d5c8368 (user component finished)

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
<<<<<<< HEAD
  create(@Body() createPetDto: CreatePetDto, owner: User) {
    return this.petService.create(createPetDto, owner);
=======
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
>>>>>>> d5c8368 (user component finished)
  }

  @Get()
  findAll() {
    return this.petService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
<<<<<<< HEAD
    return this.petService.findById(id);
=======
    return this.petService.findOne(+id);
>>>>>>> d5c8368 (user component finished)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
<<<<<<< HEAD
    return this.petService.updateById(id, updatePetDto);
=======
    return this.petService.update(+id, updatePetDto);
>>>>>>> d5c8368 (user component finished)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
<<<<<<< HEAD
    return this.petService.removeById(id);
=======
    return this.petService.remove(+id);
>>>>>>> d5c8368 (user component finished)
  }
}
