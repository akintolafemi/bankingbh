import { Logger, ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
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

  const port = process.env.PORT;
  await app.listen(port, () => {
    logger.log(`Server is now listening on port ${port}`);
  });
}
bootstrap();
