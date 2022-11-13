import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/google.strategy';
import { UserModule } from '../components/user/user.module';
import { AuthService } from './auth.service';
import { SessionSerializer } from './utils/serializer';
import { GoogleOAuthConfigModule } from 'src/config/googleOAuth/config.module';

@Module({
  imports: [UserModule, GoogleOAuthConfigModule],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
