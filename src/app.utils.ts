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
      message:
        errors[0]?.children[0]?.children[0]?.constraints[
          Object?.keys(errors[0]?.children[0]?.children[0]?.constraints)[0]
        ] ||
        errors[0]?.children[0]?.constraints[
          Object?.keys(errors[0]?.children[0]?.constraints)[0]
        ] ||
        errors[0]?.constraints[Object?.keys(errors[0]?.constraints)[0]] ||
        'Unable to validate request',
    });
  },
};

export const generateAccountNumber = (): string => {
  const min = 1000000000; // Minimum 10-digit number (1 followed by 9 zeros)
  const max = 9999999999; // Maximum 10-digit number (9 nines)

  // Generate a random number between min and max (inclusive)
  const walletNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  // Convert the number to a string and return it
  return walletNumber.toString();
};
