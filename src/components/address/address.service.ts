import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Address } from '../../database/entities/address.entity';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}

  async createAddress(address: CreateAddressDto) {
    try {
      return await this.addressRepo.save(address);
    } catch (e) {
      throw new HttpException(
        'Error creating the address',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getAllAddress() {
    try {
      return await this.addressRepo.find();
    } catch (e) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAddressById(id: string) {
    try {
      return await this.addressRepo.findOne({ where: { id } });
    } catch (e) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateAddress(newAddress: UpdateAddressDto, id: string) {
    try {
      const oldAddress = await this.addressRepo.findOne({ where: { id } });

      if (!oldAddress) {
        return new HttpException(
          'Address cant be updated',
          HttpStatus.BAD_GATEWAY,
        );
      }

      const address = Object.assign(oldAddress, newAddress);

      return await this.addressRepo.save(address);
    } catch (e) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteAddressById(id: string) {
    const deleteAddress = await this.addressRepo.findOne({ where: { id } });

    if (!deleteAddress)
      return new HttpException('Remove failed', HttpStatus.NOT_FOUND);

    await this.addressRepo.delete(id);

    return deleteAddress;
  }
}
