import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule /* { logger: false } */);

  const logger = new Logger('/Main');
  const appConfigService: AppConfigService = app.get(AppConfigService);
  app.use(
    session({
      secret: process.env.GOOGLE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('SPEEDE ADMIN API')
    .setDescription('API for Speede Fitness Admin')
    .setVersion('1.0')
    .addTag('SPEEDE API')
    .addApiKey({ name: 'apiKey', in: 'header', type: 'apiKey' })
    .addBearerAuth(undefined, 'JWTAuth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`api/swagger`, app, document);

  await app.listen(appConfigService.port, '0.0.0.0', () => {
    logger.log(`API funcionando en el puerto ${appConfigService.port}`);
  });
}
bootstrap();
