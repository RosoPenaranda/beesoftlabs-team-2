import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configServices: ConfigService) {}

  get name(): string {
    return this.configServices.get<string>('APP_NAME');
  }

  get url(): string {
    return this.configServices.get<string>('APP_URL');
  }

  get port(): number {
    return +this.configServices.get<number>('APP_PORT');
  }
}
