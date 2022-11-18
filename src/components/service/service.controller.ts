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
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from 'src/auth/decorators/auth-role.decorator';
import { UserRole } from 'src/utils/enums';

@ApiTags('Services')
@ApiBearerAuth('JWTAuth')
@Controller('services')
@UseGuards(AuthGuard('JwtHeaderStrategy'))
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @AuthRole(UserRole.ADMIN)
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @AuthRole(UserRole.CLIENT)
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @AuthRole(UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findById(id);
  }

  @AuthRole(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.updateById(id, updateServiceDto);
  }

  @AuthRole(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.removeById(id);
  }
}
