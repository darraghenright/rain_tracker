import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

function setupApiDocumentation(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Rain Tracker API')
    .setDescription('Report and view daily rain data')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  // serve docs and JSON endpoints at / and /json respectively
  SwaggerModule.setup('/', app, documentFactory, {
    jsonDocumentUrl: 'json',
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupApiDocumentation(app);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
