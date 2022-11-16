import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule /* { logger: false } */);

  const logger = new Logger('/Main');
  const appConfigService: AppConfigService = app.get(AppConfigService);

  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('PetsCare API')
    .setDescription('API for PetsCare')
    .setVersion('1.0')
    .addTag('PetsCare API')
    .addApiKey({ name: 'apiKey', in: 'header', type: 'apiKey' })
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWTAuth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/api/swagger`, app, document);

  await app.listen(appConfigService.port, '0.0.0.0', () => {
    logger.log(`Running on port: ${appConfigService.port}`);
  });
}
bootstrap();
