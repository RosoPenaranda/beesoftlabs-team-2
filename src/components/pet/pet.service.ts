import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/database/entities/pet.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetService {
  private readonly logger = new Logger('PetService');

  constructor(
    @InjectRepository(Pet) private readonly petRepo: Repository<Pet>,
  ) {}
  async create(newPet: CreatePetDto, owner: User) {
    try {
      return await this.petRepo.save({ ...newPet, owner: owner });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create new pet');
    }
  }

  async findAll() {
    try {
      const pets = await this.petRepo.find({ order: { name: 'DESC' } });

      if (!pets || pets.length === 0) {
        throw new NotFoundException('Pets not found or empty');
      }
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find all pets');
    }
  }

  async findById(id: string) {
    try {
      const pet = await this.petRepo.findOne({
        relations: ['user'],
        where: { id: id },
      });
      if (!pet) {
        throw new NotFoundException('Pet not found');
      }
      return pet;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find pet');
    }
  }

  async updateById(id: string, updatePet: UpdatePetDto) {
    try {
      const pet = await this.petRepo.findOne({ where: { id } });

      if (!pet) {
        throw new NotFoundException('Pet not found');
      }
      const updatedpet = { ...pet, ...updatePet };
      return await this.petRepo.save(updatedpet);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update pet');
    }
  }

  async removeById(id: string) {
    try {
      const pet = await this.findById(id);
      await this.petRepo.delete(pet.id);
      return pet;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to delete pet');
    }
  }
}
