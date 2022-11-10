import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(newUser: CreateUserDto) {
    try {
      return await this.userRepo.save(newUser);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error, 'Error creating user');
    }
  }

  async findAll() {
    try {
      const users = await this.userRepo.find();

      if (!users) {
        throw new NotFoundException(`Users not found`);
      }
      return users;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error, 'Error finding users');
    }
  }

  async findById(id: string) {
    try {
      const user = await this.userRepo.findOne({ where: { id: id } });
      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      return user;
    } catch (error) {
      this.logger.error(error);
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
      );
    }
  }

  async updateById(id: string, updateUser: Partial<UpdateUserDto>) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      const updatedUser = Object.assign(user, updateUser);
      return await this.userRepo.save(updatedUser);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error, 'Error updating user');
    }
  }

  async removeById(id: string) {
    try {
      const user = await this.findById(id);
      await this.userRepo.delete(user.id);
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error, 'Error deleting user');
    }
  }
}
