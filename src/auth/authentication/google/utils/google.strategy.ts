import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable, Logger } from '@nestjs/common';
import { GoogleOAuthConfigService } from 'src/config/googleOAuth/config.service';
import { GoogleUser } from 'src/utils/types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger('GoogleStrategyLogger');

  constructor(private readonly config: GoogleOAuthConfigService) {
    super({
      clientID: config.client,
      clientSecret: config.secret,
      callbackURL: config.callbackUrl,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    this.logger.log('1', accessToken);
    this.logger.log('2', refreshToken);
    this.logger.log('3', profile);

    const user: GoogleUser = {
      email: profile.emails[0].value,
      name: profile.displayName,
      profile_picture: profile.photos[0].value,
    };
    done(null, user);
  }
}
