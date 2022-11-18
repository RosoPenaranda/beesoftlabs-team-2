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
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from 'src/auth/decorators/auth-role.decorator';
import { UserRole } from 'src/utils/enums';

@ApiTags('Addresses')
@ApiBearerAuth('JWTAuth')
@Controller('addresses')
@UseGuards(AuthGuard('JwtHeaderStrategy'))
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  createAddress(@Body() addressDto: CreateAddressDto, @GetUser() owner: User) {
    console.log('address owner: ', owner);
    return this.addressService.create(addressDto, owner);
  }

  @AuthRole(UserRole.ADMIN)
  @Get()
  getAllAddress() {
    return this.addressService.findAll();
  }

  @Get('/:id')
  getAddressById(@Param('id') id: string) {
    return this.addressService.findById(id);
  }

  @Get('ownerId/:ownerId')
  getAllAddressByUserId(@Param('ownerId') ownerId: string) {
    return this.addressService.findByUserId(ownerId);
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
