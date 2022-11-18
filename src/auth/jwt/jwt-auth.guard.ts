import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-header-strategy';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/components/user/user.service';

@Injectable()
export class JwtAuthGuard extends PassportStrategy(
  Strategy,
  'JwtHeaderStrategy',
) {
  private logger = new Logger('JwtAuthGuardLogger');
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super({ passReqToCallback: true });
  }

  async validate(req: Request, data: string) {
    if (!data) {
      this.logger.error('No token found in jwt auth guard');
      throw new UnauthorizedException('No token found');
    }

    try {
      const googleuser = this.jwtService.decode(data) as any;
      const userInDB = await this.userService.findByEmail(googleuser.email);
      if (!userInDB) {
        const newEntry = {
          name: googleuser.name,
          email: googleuser.email,
          profile_picture: googleuser.picture
        }
        console.log('New entry',newEntry);
        const newUser = await this.userService.create(newEntry);

        req.user = newUser;
        return newUser;
      }
      req.user = userInDB;
      return userInDB;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error validating token');
    }
  }
}
