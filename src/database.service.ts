import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationShutdown,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown
{
  private readonly logger = new Logger(DatabaseService.name);
  constructor() {
    super({
      errorFormat:
        `${process.env.NODE_ENV}` === 'development' ? 'pretty' : undefined,
    });
  }
  async onModuleInit() {
    this.logger.log('Connected to PostgresDB service database');
  }
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('Disconnected from PostgresDB service database');
  }
  onApplicationShutdown(signal?: string) {
    this.logger.log(`Application shutdown gracefully with signal, ${signal}`);
  }
}
