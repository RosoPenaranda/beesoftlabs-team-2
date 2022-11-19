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
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from 'src/auth/decorators/auth-role.decorator';
import { UserRole } from 'src/utils/enums';
import { ResponseAddressWithRelationsDto } from './dto/responseAdressWithRelations.dto';
import { ResponseAddressWithoutRelationsDto } from './dto/responseAddressWithoutRelations.dto';

@ApiTags('Addresses')
@ApiBearerAuth('JWTAuth')
@Controller('addresses')
@UseGuards(AuthGuard('JwtHeaderStrategy'))
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiResponse({
    type: ResponseAddressWithRelationsDto,
    description: 'Address successfully created',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error creating address' })
  @ApiOperation({
    summary: 'Create a new Address',
  })
  @Post()
  createAddress(@Body() addressDto: CreateAddressDto, @GetUser() owner: User) {
    console.log('address owner: ', owner);
    return this.addressService.create(addressDto, owner);
  }

  @ApiOperation({
    summary: 'Find all stored addresses',
  })
  @ApiResponse({
    type: [ResponseAddressWithoutRelationsDto],
    description: 'Array of addresses',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding addresses' })
  @AuthRole(UserRole.ADMIN)
  @Get()
  getAllAddress() {
    return this.addressService.findAll();
  }

  @ApiOperation({
    summary: 'Find an address using its ID',
  })
  @ApiParam({ name: 'id', description: 'ID of the address' })
  @ApiResponse({
    type: ResponseAddressWithRelationsDto,
    description: 'Returns the address',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding address' })
  @ApiNotFoundResponse({ description: 'Address not found' })
  @Get('/:id')
  getAddressById(@Param('id') id: string) {
    return this.addressService.findById(id);
  }

  @ApiOperation({
    summary: 'Find all addresses using its owner ID',
  })
  @ApiParam({ name: 'ownerId', description: 'ID of the user' })
  @ApiResponse({
    type: [ResponseAddressWithoutRelationsDto],
    description:
      'Returns an array with the addresses that belong to the same user',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding address' })
  @Get('ownerId/:ownerId')
  getAllAddressByUserId(@Param('ownerId') ownerId: string) {
    return this.addressService.findByUserId(ownerId);
  }

  @ApiOperation({
    summary: 'Find an address using its ID and update its properties',
  })
  @ApiParam({ name: 'id', description: 'ID of the address' })
  @ApiResponse({
    type: ResponseAddressWithoutRelationsDto,
    description: 'Returns the updated address',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error updating address' })
  @ApiNotFoundResponse({ description: 'Address not found' })
  @Patch('/:id')
  patchAddress(@Body() newAddress: UpdateAddressDto, @Param('id') id: string) {
    return this.addressService.updateById(newAddress, id);
  }

  @ApiOperation({
    summary: 'Find an address using its ID and deletes it',
  })
  @ApiParam({ name: 'id', description: 'ID of the address' })
  @ApiResponse({
    type: ResponseAddressWithoutRelationsDto,
    description: 'Returns the removed address',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error deleting address' })
  @ApiNotFoundResponse({ description: 'Address not found' })
  @Delete('/:id')
  deleteAddressById(@Param('id') id: string) {
    return this.addressService.removeById(id);
  }
}
