import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './createUser.dto';
import { User } from '../../database/entities/user.entity';
import { DemoAppService } from './demo-app.service';
import { ReadUserDto } from './readUser.dto';

export interface IResponse {
  appName: string;
  appUrl: string;
  appPort: number;
}
@Controller('user')
export class DemoAppController {
  constructor(private readonly appService: DemoAppService) {}

  @Get('hello')
  getHello(): IResponse {
    return this.appService.getHello();
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.appService.getAllUsers();
  }

  @Get(':userId')
  getUser(@Param('userId') userId: number): Promise<User> {
    return this.appService.getUsers(userId);
  }

  @Post('add/queries')
  createUserQueries(
    @Query('name') name: string,
    @Query('address') address: string,
    @Query('email') email: string,
    @Query('age') age: number,
  ): Promise<User> {
    return this.appService.createUser(name, address, email, age);
  }

  @Post('add/params/name/:name/address/:address/email/:email/age/:age')
  createUserParams(
    @Param('name') name: string,
    @Param('address') address: string,
    @Param('email') email: string,
    @Param('age') age: number,
  ): Promise<User> {
    return this.appService.createUser(name, address, email, age);
  }

  @Post('add/body')
  createUserBody(
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('email') email: string,
    @Body('age') age: number,
  ): Promise<User> {
    return this.appService.createUser(name, address, email, age);
  }

  @Post('add/dto')
  @UsePipes(new ValidationPipe({ transform: true }))
  createUserDto(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.appService.createUser(
      createUserDto.name,
      createUserDto.address,
      createUserDto.email,
      createUserDto.age,
    );
  }

  @Post('add/dto/responseDto')
  @UsePipes(new ValidationPipe({ transform: true }))
  createUserDtoResponseDto(@Body() createUserDto: CreateUserDto): ReadUserDto {
    const respuesta = this.appService.createUser(
      createUserDto.name,
      createUserDto.address,
      createUserDto.email,
      createUserDto.age,
    );

    return plainToInstance(ReadUserDto, respuesta, {
      excludeExtraneousValues: true,
    });
  }
}
