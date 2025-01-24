import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import MainGuard from './main.guards';
import { OpenCurrentAccountDto } from './app.dtos';

@UseGuards(MainGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post(`/open-current-account`)
  public async openCustomerCurrentAccount(@Body() req: OpenCurrentAccountDto) {
    return this.appService.openCustomerCurrentAccount(req);
  }

  @Get(`/open-current-account/:customer_id`)
  public async fetchCustomerData(@Param('customer_id') customer_id: string) {
    return this.appService.fetchCustomerData(customer_id);
  }

  @Get(`/open-current-account/:account_number`)
  public async fetchAccountTransactions(
    @Param('account_number') account_number: string,
  ) {
    return this.appService.fetchAccountTransactions(account_number);
  }
}
