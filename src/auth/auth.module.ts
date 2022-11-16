import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/components/user/user.module';
import { GoogleOAuthConfigModule } from 'src/config/googleOAuth/config.module';
import { JwtConfigModule } from 'src/config/jwt/config.module';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { GoogleOAuthController } from './authentication/google/googleOAuth.controller';
import { GoogleOAuthService } from './authentication/google/googleOAuth.service';
import { GoogleStrategy } from './authentication/google/utils/google.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    JwtConfigModule,
    UserModule,
    GoogleOAuthConfigModule,
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      inject: [JwtConfigService],
      useFactory: (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.jwtSecret,
        signOptions: {
          expiresIn: jwtConfigService.jwtExpirationTime,
        },
      }),
    }),
  ],
  controllers: [GoogleOAuthController],
  providers: [GoogleStrategy, GoogleOAuthService, JwtStrategy],
})
export class AuthModule {}
