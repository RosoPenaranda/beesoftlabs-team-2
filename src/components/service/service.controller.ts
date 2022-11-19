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
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from 'src/auth/decorators/auth-role.decorator';
import { UserRole } from 'src/utils/enums';
import { ResponseServiceDto } from './dto/response-service.dto';

@ApiTags('Services')
@ApiBearerAuth('JWTAuth')
@Controller('services')
@UseGuards(AuthGuard('JwtHeaderStrategy'))
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiResponse({
    type: ResponseServiceDto,
    description: 'Service successfully created',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error creating service' })
  @ApiOperation({
    summary: 'Create a new Service',
  })
  @AuthRole(UserRole.ADMIN)
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @ApiOperation({
    summary: 'Find all stored services',
  })
  @ApiResponse({
    type: [ResponseServiceDto],
    description: 'Array of services',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding services' })
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @ApiOperation({
    summary: 'Find a service using its ID',
  })
  @ApiParam({ name: 'id', description: 'ID of the service' })
  @ApiResponse({
    type: ResponseServiceDto,
    description: 'Returns the service',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding service' })
  @ApiNotFoundResponse({ description: 'Service not found' })
  @AuthRole(UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findById(id);
  }

  @ApiOperation({
    summary: 'Find a service using its ID and update its properties',
  })
  @ApiParam({ name: 'id', description: 'ID of the service' })
  @ApiResponse({
    type: ResponseServiceDto,
    description: 'Returns the updated service',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error updating service' })
  @ApiNotFoundResponse({ description: 'Service not found' })
  @AuthRole(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.updateById(id, updateServiceDto);
  }

  @ApiOperation({
    summary: 'Find a service using its ID and deletes it',
  })
  @ApiParam({ name: 'id', description: 'ID of the service' })
  @ApiResponse({
    type: ResponseServiceDto,
    description: 'Returns the removed service',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error deleting service' })
  @ApiNotFoundResponse({ description: 'Service not found' })
  @AuthRole(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.removeById(id);
  }
}
