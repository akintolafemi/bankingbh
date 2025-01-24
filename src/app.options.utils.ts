import {
  BadRequestException,
  HttpStatus,
  NestApplicationOptions,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

export const AppOptions: NestApplicationOptions = {
  rawBody: true,
  cors: {
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  },
};

export const ValidationPipesOptions: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => {
    return new BadRequestException({
      status: 'Bad Request',
      code: HttpStatus.BAD_REQUEST,
      message: JSON.stringify(errors) || 'Unable to validate request',
    });
  },
};
