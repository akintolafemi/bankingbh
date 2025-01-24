import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import MainGuard from './main.guards';
import { OpenCurrentAccountDto } from './app.dtos';

@UseGuards(MainGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post(`/open-current-account`)
  public async signJWT(@Body() req: OpenCurrentAccountDto) {
    return this.appService.openCustomerCurrentAccount(req);
  }
}
