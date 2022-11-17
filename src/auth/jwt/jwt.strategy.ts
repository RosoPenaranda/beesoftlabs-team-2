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
      ignoreExpiration: false,
      secretOrKey: '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',
    });
  }

  async validate(payload: any) {
    console.log(payload)
    const user = this.userService.findByEmail(payload.email);
    console.log(user)
    if (!user) {
      throw new NotFoundException('Unauthorized token');
    }

    return user;
  }
}
