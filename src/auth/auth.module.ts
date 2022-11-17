import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/components/user/user.module';
import { GoogleOAuthConfigModule } from 'src/config/googleOAuth/config.module';
import { JwtConfigModule } from 'src/config/jwt/config.module';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { GoogleOAuthController } from './authentication/google/googleOAuth.controller';
import { GoogleOAuthService } from './authentication/google/googleOAuth.service';
import { GoogleStrategy } from './authentication/google/utils/google.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/components/user/user.service';
import { User } from 'src/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    PassportModule.register({defaultStrategy: 'bearer'})
  ],
  controllers: [GoogleOAuthController],
  providers: [
    UserService,
    JwtStrategy,
    GoogleStrategy,
    GoogleOAuthService,
  ],
  exports: [
    JwtService,
    JwtStrategy,
    JwtModule
  ]
})
export class AuthModule {}
