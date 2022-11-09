import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from '../../database/entities/address.entity';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { CRUD } from 'src/utils/CRUD.interface';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class AddressService implements CRUD<Address> {
  private readonly logger = new Logger('AddressService');

  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}

  async create(address: CreateAddressDto, user: User) {
    try {
      return await this.addressRepo.save(address);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Error creating the address',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findAll() {
    try {
      return await this.addressRepo.find();
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }
  }

  async findById(id: string) {
    try {
      return await this.addressRepo.findOne({ where: { id } });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateById(id: string, newAddress: Partial<UpdateAddressDto>) {
    try {
      const oldAddress = await this.addressRepo.findOne({ where: { id } });
      if (!oldAddress) {
        this.logger.error('Address not found, could not delete it');
        throw new HttpException(
          'Address not found, verify the information',
          HttpStatus.NOT_FOUND,
        );
      }
      const address = Object.assign(oldAddress, newAddress);
      return await this.addressRepo.save(address);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Address not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeById(id: string) {
    try {
      const deleteAddress = await this.addressRepo.findOne({ where: { id } });

      if (!deleteAddress) {
        this.logger.error('Address not found, could not delete it');
        throw new HttpException(
          'Address not found, verify the information',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.addressRepo.delete(id);

      return deleteAddress;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Remove failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
