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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/utils/enums';
import { AuthRole } from 'src/auth/decorators/auth-role.decorator';

@ApiTags('Users')
@ApiBearerAuth('JWTAuth')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @AuthRole(UserRole.ADMIN)
  @Get()
  @UseGuards(AuthGuard('JwtHeaderStrategy'))
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('JwtHeaderStrategy'))
  findOneById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('/email/:email')
  @UseGuards(AuthGuard('JwtHeaderStrategy'))
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('JwtHeaderStrategy'))
  patch(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateById(id, updateUserDto);
  }

  @AuthRole(UserRole.ADMIN)
  @Delete(':id')
  @UseGuards(AuthGuard('JwtHeaderStrategy'))
  remove(@Param('id') id: string) {
    return this.userService.removeById(id);
  }
}
