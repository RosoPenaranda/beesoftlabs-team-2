import {
<<<<<<< HEAD
  Put,
=======
  Controller,
>>>>>>> d5c8368 (user component finished)
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
<<<<<<< HEAD
  UseGuards,
  Controller,
=======
  Put,
>>>>>>> d5c8368 (user component finished)
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
<<<<<<< HEAD
import { GoogleAuthGuard } from '../../auth/utils/guards';
=======
>>>>>>> d5c8368 (user component finished)

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

<<<<<<< HEAD
  @Get('/getUsers')
  @UseGuards(GoogleAuthGuard)
=======
  @Get()
>>>>>>> d5c8368 (user component finished)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  patch(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<UpdateUserDto>,
  ) {
    return this.userService.updateById(id, updateUserDto);
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() updateUserDto: Required<UpdateUserDto>) {
    return this.userService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeById(id);
  }
}
