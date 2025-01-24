import { Logger, ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppOptions, ValidationPipesOptions } from './app.utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    AppOptions,
  );

  app.setGlobalPrefix('/api/v1');

  app.set('trust proxy', true);

  app.useGlobalPipes(new ValidationPipe(ValidationPipesOptions));

  const logger = new Logger(NestApplication.name);

  const config = new DocumentBuilder()
    .addSecurity('bearer', {
      scheme: 'bearer',
      type: 'http',
      bearerFormat: 'JWT',
      name: 'authoriz',
    })
    .setTitle('BankingBH Accounts API')
    .setDescription(
      'API to be used for opening a new "current account" of already existing customers.',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, documentFactory);

  const port = process.env.PORT;
  await app.listen(port, () => {
    logger.log(`Server is now listening on port ${port}`);
  });
}
bootstrap();
