import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { User } from '../../database/entities/user.entity';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  createAddress(@Body() addressDto: CreateAddressDto, user: User) {
    return this.addressService.create(addressDto, user);
  }

  @Get()
  getAllAddress() {
    return this.addressService.findAll();
  }

  @Get('/:id')
  getAddressById(@Param('id') id: string) {
    return this.addressService.findById(id);
  }

  @Patch('/:id')
  patchAddress(
    @Body() newAddress: Partial<UpdateAddressDto>,
    @Param('id') id: string,
  ) {
    return this.addressService.updateById(id, newAddress);
  }

  @Delete('/:id')
  deleteAddressById(@Param('id') id: string) {
    return this.addressService.removeById(id);
  }
}
