import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule /* { logger: false } */);

  const logger = new Logger('/Main');
  const appConfigService: AppConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port, '0.0.0.0', () => {
    logger.log(`API funcionando en el puerto ${appConfigService.port}`);
  });
}
bootstrap();
