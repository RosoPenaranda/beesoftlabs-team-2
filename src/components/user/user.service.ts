import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { CRUD } from 'src/utils/CRUD.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService implements CRUD<User> {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(newUser: CreateUserDto) {
    try {
      return await this.userRepo.save(newUser);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Error creating new user',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userRepo.find();

      if (!users) {
        throw new HttpException(`Resource not found`, HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Error finding all users: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string) {
    try {
      const user = await this.userRepo.findOne({ where: { id: id } });
      if (!user) {
        throw new HttpException(`Resource not found`, HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Error finding user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateById(id: string, updateUser: UpdateUserDto) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });

      if (!user) {
        throw new HttpException(`Resource not found`, HttpStatus.NOT_FOUND);
      }
      const updatedUser = Object.assign(user, updateUser);
      return await this.userRepo.save(updatedUser);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Error updating user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeById(id: string) {
    try {
      const user = await this.findById(id);
      await this.userRepo.delete(user.id);
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Error removing user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
