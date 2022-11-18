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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from 'src/auth/decorators/auth-role.decorator';
import { UserRole } from 'src/utils/enums';

@ApiTags('Pets')
@ApiBearerAuth('JWTAuth')
@Controller('pets')
@UseGuards(AuthGuard('JwtHeaderStrategy'))
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto, @GetUser() owner: User) {
    return this.petService.create(createPetDto, owner);
  }

  @AuthRole(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.petService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petService.findById(id);
  }

  @Get('/ownerId/:ownerId')
  findAllByUser(@Param('ownerId') ownerId: string) {
    return this.petService.findByUserId(ownerId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.updateById(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petService.removeById(id);
  }
}
