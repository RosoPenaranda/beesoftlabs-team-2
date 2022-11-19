import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { User } from 'src/database/entities/user.entity';
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
import { ResponsePetWithRelationsDto } from './dto/response-pet-with-relations.dto';
import { ResponsePetWithoutRelationsDto } from './dto/response-pet-without-relations.dto';

@ApiTags('Pets')
@ApiBearerAuth('JWTAuth')
@Controller('pets')
@UseGuards(AuthGuard('JwtHeaderStrategy'))
export class PetController {
  constructor(private readonly petService: PetService) {}

  @ApiResponse({
    type: ResponsePetWithRelationsDto,
    description: 'Pet successfully created',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error creating pet' })
  @ApiOperation({
    summary: 'Create a new pet',
  })
  @Post()
  create(@Body() createPetDto: CreatePetDto, @GetUser() owner: User) {
    return this.petService.create(createPetDto, owner);
  }

  @ApiOperation({
    summary: 'Find all stored pets',
  })
  @ApiResponse({
    type: [ResponsePetWithoutRelationsDto],
    description: 'Array of pets',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding pets' })
  @AuthRole(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.petService.findAll();
  }

  @ApiOperation({
    summary: 'Find a pet using its ID',
  })
  @ApiParam({ name: 'id', description: 'ID of the pet' })
  @ApiResponse({
    type: ResponsePetWithRelationsDto,
    description: 'Returns the pet',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding pet' })
  @ApiNotFoundResponse({ description: 'Pet not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petService.findById(id);
  }

  @ApiOperation({
    summary: 'Find all pets using its owner ID',
  })
  @ApiParam({ name: 'ownerId', description: 'ID of the user' })
  @ApiResponse({
    type: [ResponsePetWithoutRelationsDto],
    description: 'Returns an array with the pets that belong to the same user',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding pets' })
  @Get('/ownerId/:ownerId')
  findAllByUser(@Param('ownerId') ownerId: string) {
    return this.petService.findByUserId(ownerId);
  }

  @ApiOperation({
    summary: 'Find a pet using its ID and update its properties',
  })
  @ApiParam({ name: 'id', description: 'ID of the pet' })
  @ApiResponse({
    type: ResponsePetWithoutRelationsDto,
    description: 'Returns the updated pet',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error updating pet' })
  @ApiNotFoundResponse({ description: 'Pet not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.updateById(id, updatePetDto);
  }

  @ApiOperation({
    summary: 'Find an pet using its ID and deletes it',
  })
  @ApiParam({ name: 'id', description: 'ID of the pet' })
  @ApiResponse({
    type: ResponsePetWithoutRelationsDto,
    description: 'Returns the removed pet',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error deleting pet' })
  @ApiNotFoundResponse({ description: 'Pet not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petService.removeById(id);
  }
}
