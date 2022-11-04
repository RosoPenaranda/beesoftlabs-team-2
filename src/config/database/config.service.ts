import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  get port(): number {
    return +this.configService.get<number>('DATABASE_PORT');
  }

  get database(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  get username(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  get password(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  get logging(): boolean {
    return this.configService.get<boolean>('DATABASE_LOGGING');
  }

  get logger(): string {
    return this.configService.get<string>('DATABASE_LOGGER');
  }
}
