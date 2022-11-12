import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from 'src/database/entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  private readonly logger = new Logger('ServiceService');

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {}
  async create(newService: CreateServiceDto) {
    try {
      return await this.serviceRepo.save(newService);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create new service');
    }
  }

  async findAll() {
    try {
      const services = await this.serviceRepo.find();
      if (!services || services.length === 0) {
        throw new NotFoundException('services not found or empty');
      }
      return services;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find all services');
    }
  }

  async findById(id: string) {
    try {
      const service = await this.serviceRepo.findOne({
        where: { id: id },
      });
      if (!service) {
        throw new NotFoundException('Service not found');
      }
      return service;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find service');
    }
  }

  async updateById(id: string, updateService: UpdateServiceDto) {
    try {
      const service = await this.findById(id);
      const updatedservice = { ...service, ...updateService };
      return await this.serviceRepo.save(updatedservice);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update service');
    }
  }

  async removeById(id: string) {
    try {
      const service = await this.findById(id);
      await this.serviceRepo.delete(service.id);
      return service;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to delete service');
    }
  }
}
