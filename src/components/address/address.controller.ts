import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { User } from '../../database/entities/user.entity';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@ApiTags('Addresses')
@ApiBearerAuth('JWTAuth')
@Controller('addresses')
@UseGuards(JwtAuthGuard)
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
  patchAddress(@Body() newAddress: UpdateAddressDto, @Param('id') id: string) {
    return this.addressService.updateById(newAddress, id);
  }

  @Delete('/:id')
  deleteAddressById(@Param('id') id: string) {
    return this.addressService.removeById(id);
  }
}
