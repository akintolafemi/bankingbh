import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class AppService {
  constructor(private readonly dbService: DatabaseService) {}
  getHello(): string {
    return 'Hello World!';
  }
}
