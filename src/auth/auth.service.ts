import { Injectable, Logger } from '@nestjs/common';
import { UserDetails } from '../utils/userType';
import { UserService } from '../components/user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(private readonly userService: UserService) {}

  async validateUser(details: UserDetails) {
    this.logger.log('AuthService: ', details);

    const user = await this.userService.findByEmail(details.email);

    this.logger.log('Function validateUser:', user);

    if (user) return user;
    this.logger.log('User not found. Creating...');

    return await this.userService.create(details);
  }

  async findUser(email: string) {
    const user = await this.userService.findByEmail(email);
    this.logger.log('findUser AuthService:', user);
    return user;
  }
}
