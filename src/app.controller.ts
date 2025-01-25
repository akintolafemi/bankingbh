import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AppService } from './app.service';
import MainGuard from './main.guards';
import { OpenCurrentAccountDto } from './app.dtos';

@ApiBearerAuth()
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Invalid authorization token',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Application error',
})
@ApiResponse({
  status: HttpStatus.NOT_FOUND,
  description: 'Record not found',
})
@UseGuards(MainGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Account created successfully',
  })
  @Post(`/open-current-account`)
  public async openCustomerCurrentAccount(@Body() req: OpenCurrentAccountDto) {
    return this.appService.openCustomerCurrentAccount(req);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer data fetched successfully!',
  })
  @ApiParam({
    name: 'customer_id',
    example: 'c680e057-7e1f-470f-a482-e6404376b9c1',
    required: true,
    type: 'string',
  })
  @Get(`/customer/:customer_id`)
  public async fetchCustomerData(@Param('customer_id') customer_id: string) {
    return this.appService.fetchCustomerData(customer_id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Account transactions fetched successfully!',
  })
  @ApiParam({
    name: 'account_number',
    example: '00000000',
    required: true,
    type: 'string',
  })
  @Get(`/transactions/:account_number`)
  public async fetchAccountTransactions(
    @Param('account_number') account_number: string,
  ) {
    return this.appService.fetchAccountTransactions(account_number);
  }
}
