import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleOAuthConfigService {
  constructor(private configServices: ConfigService) {}

  get client(): string {
    return this.configServices.get<string>('GOOGLE_CLIENT');
  }

  get secret(): string {
    return this.configServices.get<string>('GOOGLE_SECRET');
  }

  get callbackUrl(): string {
    return this.configServices.get<string>('CALLBACK_URL');
  }
}
