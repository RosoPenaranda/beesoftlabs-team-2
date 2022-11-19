import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
import { UserRole } from 'src/utils/enums';
import { AuthRole } from 'src/auth/decorators/auth-role.decorator';
import { ResponseUserWithRelationsDto } from './dto/response-user-with-relations.dto';
import { ResponseUserWithoutRelationsDto } from './dto/response-user-without-relations.dto';

@ApiTags('Users')
@ApiBearerAuth('JWTAuth')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    type: ResponseUserWithRelationsDto,
    description: 'User successfully created',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error creating user' })
  @ApiOperation({
    summary: 'Create a new User',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Find all stored users',
  })
  @ApiResponse({
    type: [ResponseUserWithoutRelationsDto],
    description: 'Array of users',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding users' })
  @Get()
  @UseGuards(AuthGuard('JwtHeaderStrategy'))
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Find a user using its ID',
  })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @ApiResponse({
    type: ResponseUserWithRelationsDto,
    description: 'Returns the user',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':id')
  @UseGuards(AuthGuard('JwtHeaderStrategy'))
  findOneById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiOperation({
    summary: 'Find a user using its email',
  })
  @ApiParam({ name: 'email', description: 'User email' })
  @ApiResponse({
    type: ResponseUserWithRelationsDto,
    description: 'Returns the user',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding user' })
  @Get('/email/:email')
  @UseGuards(AuthGuard('JwtHeaderStrategy'))
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @ApiOperation({
    summary: 'Find a user using its ID and update its properties',
  })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @ApiResponse({
    type: ResponseUserWithoutRelationsDto,
    description: 'Returns the updated user',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error updating user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Patch(':id')
  @UseGuards(AuthGuard('JwtHeaderStrategy'))
  patch(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateById(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Find a user using its ID and deletes it',
  })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @ApiResponse({
    type: ResponseUserWithoutRelationsDto,
    description: 'Returns the removed user',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error deleting user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @AuthRole(UserRole.ADMIN)
  @Delete(':id')
  @UseGuards(AuthGuard('JwtHeaderStrategy'))
  remove(@Param('id') id: string) {
    return this.userService.removeById(id);
  }
}
