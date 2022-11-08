import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from '../../database/entities/address.entity';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { CRUD } from 'src/utils/CRUD.interface';

@Injectable()
export class AddressService implements CRUD<Address> {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}

  async create(address: CreateAddressDto) {
    try {
      return await this.addressRepo.save(address);
    } catch (e) {
      throw new HttpException(
        'Error creating the address',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findAll() {
    try {
      return await this.addressRepo.find();
    } catch (e) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }
  }

  async findById(id: string) {
    try {
      return await this.addressRepo.findOne({ where: { id } });
    } catch (e) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateById(id: string, newAddress: Partial<UpdateAddressDto>) {
    try {
      const oldAddress = await this.addressRepo.findOne({ where: { id } });

      if (!oldAddress) {
        throw new HttpException(
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

  async removeById(id: string) {
    const deleteAddress = await this.addressRepo.findOne({ where: { id } });

    if (!deleteAddress)
      throw new HttpException('Remove failed', HttpStatus.NOT_FOUND);

    await this.addressRepo.delete(id);

    return deleteAddress;
  }
}
