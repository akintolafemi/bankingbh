import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import MainGuard from './main.guards';

@UseGuards(MainGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
