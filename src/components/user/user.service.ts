<<<<<<< HEAD
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
=======
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { CRUD } from 'src/utils/CRUD.interface';
import { Repository } from 'typeorm';
>>>>>>> d5c8368 (user component finished)
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
<<<<<<< HEAD
export class UserService {
=======
export class UserService implements CRUD<User> {
>>>>>>> d5c8368 (user component finished)
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(newUser: CreateUserDto) {
    try {
      return await this.userRepo.save(newUser);
    } catch (error) {
      this.logger.error(error);
<<<<<<< HEAD
      throw new InternalServerErrorException(error, 'Error creating user');
=======
      throw new HttpException(
        'Error creating new user',
        HttpStatus.BAD_GATEWAY,
      );
>>>>>>> d5c8368 (user component finished)
    }
  }

  async findAll() {
    try {
      const users = await this.userRepo.find();

      if (!users) {
<<<<<<< HEAD
        throw new NotFoundException(`Users not found`);
      }
      return users;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error, 'Error finding users');
=======
        throw new HttpException(`Resource not found`, HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Error finding all users: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
>>>>>>> d5c8368 (user component finished)
    }
  }

  async findById(id: string) {
    try {
      const user = await this.userRepo.findOne({ where: { id: id } });
      if (!user) {
<<<<<<< HEAD
        throw new NotFoundException(`User not found`);
=======
        throw new HttpException(`Resource not found`, HttpStatus.NOT_FOUND);
>>>>>>> d5c8368 (user component finished)
      }
      return user;
    } catch (error) {
      this.logger.error(error);
<<<<<<< HEAD
      throw new InternalServerErrorException(error, 'Error finding user');
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepo.findOne({ where: { email: email } });
      if (!user) {
        throw new NotFoundException(`Email: ${email} not found`);
      }
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        error,
        'Error finding user by email',
=======
      throw new HttpException(
        `Error finding user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
>>>>>>> d5c8368 (user component finished)
      );
    }
  }

  async updateById(id: string, updateUser: UpdateUserDto) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });

      if (!user) {
<<<<<<< HEAD
        throw new NotFoundException(`User not found`);
=======
        throw new HttpException(`Resource not found`, HttpStatus.NOT_FOUND);
>>>>>>> d5c8368 (user component finished)
      }
      const updatedUser = Object.assign(user, updateUser);
      return await this.userRepo.save(updatedUser);
    } catch (error) {
      this.logger.error(error);
<<<<<<< HEAD
      throw new InternalServerErrorException(error, 'Error updating user');
=======
      throw new HttpException(
        `Error updating user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
>>>>>>> d5c8368 (user component finished)
    }
  }

  async removeById(id: string) {
    try {
      const user = await this.findById(id);
      await this.userRepo.delete(user.id);
      return user;
    } catch (error) {
      this.logger.error(error);
<<<<<<< HEAD
      throw new InternalServerErrorException(error, 'Error deleting user');
=======
      throw new HttpException(
        `Error removing user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
>>>>>>> d5c8368 (user component finished)
    }
  }
}
