import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import * as dotenv from 'dotenv';
import { Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

dotenv.config({ path: '.env' });

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthService
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:5001/api/auth/google/callback',
      scope: ['profile','email']
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile
  ) {
    console.log('1', accessToken)
    console.log('2', refreshToken)
    console.log('3', profile)

    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      profile_picture: profile.photos[0].value,
    });
    console.log('Function validate:', user);
    return user || null;
  }

}
