import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { IJwtPayload } from './jwt-payload.interface';
import { UserService } from 'src/components/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: JwtConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: config.jwtIgnoreExpiration,
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = this.userService.findByEmail(payload.email);
    if (!user) {
      throw new NotFoundException('Unauthorized token');
    }

    return user;
  }
}
