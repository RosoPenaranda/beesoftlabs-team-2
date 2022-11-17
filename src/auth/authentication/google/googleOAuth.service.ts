import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/components/user/user.service';
import { GoogleUser } from 'src/utils/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleOAuthService {
  private readonly logger = new Logger('GoogleOAuthServiceLogger');
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async googleLogin(req: Request) {
    if (!req.user) {
      throw new NotFoundException('Not received user from Google');
    }
    const user = req.user as GoogleUser;
    const userInDB = await this.validateUser(user);
    return {
      access_token: this.jwtService.sign({
        id: userInDB.id,
        email: userInDB.email,
        name: userInDB.name,
        roles: userInDB.roles,
      }),
      userInDB: userInDB,
    };
  }

  private async validateUser(user: GoogleUser) {
    const userInDB = await this.userService.findByEmail(user.email);
    if (!userInDB) {
      this.logger.log('User not found, creating new');
      const newUser = await this.userService.create({
        email: user.email,
        name: user.name,
        profile_picture: user.profile_picture,
      });
      return newUser;
    }
    return userInDB;
  }
}
