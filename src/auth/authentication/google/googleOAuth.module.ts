import { Module } from '@nestjs/common';
import { UserModule } from 'src/components/user/user.module';
import { GoogleOAuthConfigModule } from 'src/config/googleOAuth/config.module';
import { GoogleOAuthController } from './googleOAuth.controller';
import { GoogleOAuthService } from './googleOAuth.service';
import { GoogleStrategy } from './utils/google.strategy';

@Module({
  imports: [UserModule, GoogleOAuthConfigModule],
  controllers: [GoogleOAuthController],
  providers: [GoogleStrategy, GoogleOAuthService],
})
export class GoogleOAuthModule {}
