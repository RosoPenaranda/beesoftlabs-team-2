import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from '../../database/entities/address.entity';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class AddressService {
  private readonly logger = new Logger('AddressService');

  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}

  async create(address: CreateAddressDto, user: User) {
    try {
      return await this.addressRepo.save({ ...address, owner: user });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error, 'Error creating address');
    }
  }

  async findAll() {
    try {
      return await this.addressRepo.find();
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('Address not found');
    }
  }

  async findById(id: string) {
    try {
      return await this.addressRepo.findOne({ where: { id } });
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('Address not found');
    }
  }

  async updateById(id: string, newAddress: Partial<UpdateAddressDto>) {
    try {
      const oldAddress = await this.addressRepo.findOne({ where: { id } });
      if (!oldAddress) {
        this.logger.error('Address not found, could not delete it');
        throw new NotFoundException('Address not found, verify information');
      }
      const updateAddress = {
        ...oldAddress,
        ...newAddress,
      };
      return await this.addressRepo.save(updateAddress);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error, 'Error creating address');
    }
  }

  async removeById(id: string) {
    try {
      const deleteAddress = await this.addressRepo.findOne({ where: { id } });
      if (!deleteAddress) {
        this.logger.error('Address not found, could not delete it');
        throw new NotFoundException('Address not found, verify information');
      }
      await this.addressRepo.delete(id);
      return deleteAddress;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error, 'Error creating address');
    }
  }
}
