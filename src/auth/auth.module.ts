import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/components/user/user.service';
import { GoogleOAuthConfigModule } from 'src/config/googleOAuth/config.module';
import { JwtConfigModule } from 'src/config/jwt/config.module';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { User } from 'src/database/entities/user.entity';
import { GoogleOAuthController } from './authentication/google/googleOAuth.controller';
import { GoogleOAuthService } from './authentication/google/googleOAuth.service';
import { GoogleStrategy } from './authentication/google/utils/google.strategy';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtService,
    JwtConfigModule,
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
  providers: [
    UserService,
    JwtStrategy,
    GoogleStrategy,
    GoogleOAuthService,
    JwtAuthGuard,
  ],
  exports: [JwtService, JwtStrategy, JwtModule],
})
export class AuthModule {}
