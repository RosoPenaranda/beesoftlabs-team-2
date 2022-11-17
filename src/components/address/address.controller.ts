import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  Controller,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { User } from '../../database/entities/user.entity';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@ApiTags('Addresses')
@ApiBearerAuth('JWTAuth')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createAddress(
    @Body() addressDto: CreateAddressDto, 
    @GetUser() owner: User,
    @Req() req) {
    console.log()
    console.log(req)
    return this.addressService.create(addressDto, owner);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllAddress() {
    return this.addressService.findAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getAddressById(@Param('id') id: string) {
    return this.addressService.findById(id);
  }

  @Get('ownerId/:ownerId')
  @UseGuards(JwtAuthGuard)
  getAllAddressByUserId(@Param('ownerId') ownerId: string) {
    return this.addressService.findByUserId(ownerId);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  patchAddress(@Body() newAddress: UpdateAddressDto, @Param('id') id: string) {
    return this.addressService.updateById(newAddress, id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteAddressById(@Param('id') id: string) {
    return this.addressService.removeById(id);
  }
}
