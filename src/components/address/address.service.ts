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

  async create(address: CreateAddressDto, owner: User) {
    try {
      const newAddress = await this.addressRepo.create(address);
      newAddress.owner = owner;
      return await this.addressRepo.save(newAddress);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating address');
    }
  }

  async findAll() {
    try {
      const addresses = await this.addressRepo.find({ relations: ['owner'] });
      return addresses;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error finding addresses');
    }
  }

  async findById(id: string) {
    try {
      const address = await this.addressRepo.findOne({
        relations: ['owner'],
        where: { id: id },
      });
      if (!address) {
        throw new NotFoundException('Address not found');
      }
      return address;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error finding address');
    }
  }

  async findByUserId(userId: string) {
    try {
      const addresses = await this.addressRepo.find({
        relations: ['owner'],
        where: { owner: { id: userId } },
      });
      return addresses;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error finding addresses');
    }
  }

  async updateById(newAddress: UpdateAddressDto, id: string) {
    try {
      const oldAddress = await this.addressRepo.findOne({ where: { id } });
      if (!oldAddress) {
        throw new NotFoundException('Address not found');
      }
      const updateAddress = {
        ...oldAddress,
        ...newAddress,
      };
      return await this.addressRepo.save(updateAddress);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating address');
    }
  }

  async removeById(id: string) {
    try {
      const deleteAddress = await this.addressRepo.findOne({ where: { id } });
      if (!deleteAddress) {
        throw new NotFoundException('Address not found');
      }
      await this.addressRepo.delete({ id: id });
      return deleteAddress;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating address');
    }
  }
}
