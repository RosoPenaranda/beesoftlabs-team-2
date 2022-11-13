import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import * as dotenv from 'dotenv';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { GoogleOAuthConfigService } from 'src/config/googleOAuth/config.service';

dotenv.config({ path: '.env' });

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger('GoogleStrategyLogger');

  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthService,
    private readonly config: GoogleOAuthConfigService,
  ) {
    super({
      clientID: config.client,
      clientSecret: config.secret,
      callbackURL: config.callbackUrl,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    this.logger.log('1', accessToken);
    this.logger.log('2', refreshToken);
    this.logger.log('3', profile);

    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      profile_picture: profile.photos[0].value,
    });
    this.logger.log('Function validate:', user);
    return user || null;
  }
}
