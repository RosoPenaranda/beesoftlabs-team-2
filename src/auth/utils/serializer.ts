import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthService,
  ) {
    super();
  }

  serializeUser(user: User, done: any) {
    console.log('Serialize method: ', user);
    done(null, user);
  }

  async deserializeUser(payload: User, done: any) {
    const user = await this.authService.findUser(payload.email);
    console.log('Deserializer method: ', user);
    return user ? done(null, user) : done(null, null);
  }
}
