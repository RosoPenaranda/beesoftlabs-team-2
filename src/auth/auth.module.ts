import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwt/constants';
import { UserModule } from 'src/components/user/user.module';
import { GoogleOAuthConfigModule } from 'src/config/googleOAuth/config.module';
import { GoogleOAuthController } from './authentication/google/googleOAuth.controller';
import { GoogleOAuthService } from './authentication/google/googleOAuth.service';
import { GoogleStrategy } from './authentication/google/utils/google.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    UserModule,
    GoogleOAuthConfigModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [GoogleOAuthController],
  providers: [GoogleStrategy, GoogleOAuthService, JwtStrategy],
})
export class AuthModule {}
