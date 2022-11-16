import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get jwtSecret(): string {
    return this.configService.get<string>('jwt.jwtSecret', '');
  }

  get jwtExpirationTime(): string {
    return this.configService.get<string>('jwt.jwtExpirationTime', '');
  }

  get jwtIgnoreExpiration(): boolean {
    return this.configService.get<boolean>('JWT_IGNORE_EXPIRATION');
  }
}
