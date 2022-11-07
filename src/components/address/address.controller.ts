import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/createAddress.dto";
import { UpdateAddressDto } from "./dto/updateAddress.dto";

@Controller('address')
export class AddressController {

  constructor(
    private readonly addressService: AddressService
  ) {
  }

  @Post('/createAddress')
  createAddress(@Body()addressDto: CreateAddressDto) {
    return this.addressService.createAddress(addressDto);
  }

  @Get('/getAddress')
  getAllAddress() {
    return this.addressService.getAllAddress();
  }

  @Get('/getAddress/:id')
  getAddressById(@Param('id') id: string) {
    return this.addressService.getAddressById(id);
  }

  @Patch('/updateAddress/:id')
  updateAddress(
    @Body() newAddress: UpdateAddressDto,
    @Param('id') id: string
  ) {
    return this.addressService.updateAddress(newAddress, id);
  }

  @Delete('/deleteAddress/:id')
  deleteAddressById(@Param('id') id: string) {
    return this.addressService.deleteAddressById(id);
  }

}
