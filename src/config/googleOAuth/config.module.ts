import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleOAuthConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [GoogleOAuthConfigService],
  exports: [GoogleOAuthConfigService],
})
export class GoogleOAuthConfigModule {}
