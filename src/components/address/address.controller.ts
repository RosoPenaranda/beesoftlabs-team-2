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

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  createAddress(@Body() addressDto: CreateAddressDto) {
    return this.addressService.create(addressDto);
  }

  @Get()
  getAllAddress() {
    return this.addressService.getAll();
  }

  @Get('/:id')
  getAddressById(@Param('id') id: string) {
    return this.addressService.getById(id);
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
    return this.addressService.deleteById(id);
  }
}
