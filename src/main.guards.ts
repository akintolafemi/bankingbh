import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export default class MainGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization)
      throw new HttpException(
        {
          message: 'Authorization required to access endpoint',
          statusText: 'UNAUTHORIZED',
          status: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );

    const token = request.headers.authorization.split(' ')[1];
    if (!token || token !== `${process.env.BEARER_TOKEN}`)
      throw new HttpException(
        {
          message: 'Invalid authorization token',
          statusText: 'UNAUTHORIZED',
          status: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );

    return true;
  }
}
