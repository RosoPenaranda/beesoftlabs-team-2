import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('/Main');
  const appConfigService: AppConfigService = app.get(AppConfigService);
  app.use(session({
    secret: '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',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000,
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.setGlobalPrefix('api');

  await app.listen(appConfigService.port, '0.0.0.0', () => {
    logger.log(`API funcionando en el puerto ${appConfigService.port}`);
  });
}
bootstrap();
