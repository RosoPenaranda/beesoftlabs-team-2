import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { User } from "../../database/entities/user.entity";

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

  @Put('/:id')
  putAddress(
    @Body() newAddress: Required<UpdateAddressDto>,
    @Param('id') id: string,
  ) {
    return this.addressService.updateById(id, newAddress);
  }

  @Delete('/:id')
  deleteAddressById(@Param('id') id: string) {
    return this.addressService.removeById(id);
  }
}
