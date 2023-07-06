import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.API_PORT || 3000;
  const host = process.env.API_HOST;
  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(3000);
  Logger.log(`🚀 Application is running on: http://${host}:${port}`);
}
bootstrap();

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Templater API`s')
    .setDescription('API Specifications')
    .setVersion('1.0')
    .addCookieAuth('Refresh')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-doc', app, document);
}
