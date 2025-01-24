import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { OpenCurrentAccountDto } from './app.dtos';
import { ResponseManager, standardResponse } from './response.manager.utils';
import { generateAccountNumber } from './app.utils';

@Injectable()
export class AppService {
  constructor(private readonly dbService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async openCustomerCurrentAccount(
    req: OpenCurrentAccountDto,
  ): Promise<standardResponse | HttpException> {
    try {
      const account_number = generateAccountNumber();
      const account = await this.dbService.accounts.create({
        data: {
          customer_id: req.customer_id,
          account_number,
        },
      });

      if (req.initial_credit && Number(req.initial_credit) > 0) {
        const initial_credit = Number(req.initial_credit);
        const customerSavingsAccount = await this.dbService.accounts.findFirst({
          where: {
            customer_id: req.customer_id,
            deleted: false,
            account_type: 'savigs',
          },
        });
        if (
          customerSavingsAccount &&
          initial_credit < Number(customerSavingsAccount.account_balance)
        ) {
          await this.dbService.accounts.update({
            where: {
              id: customerSavingsAccount.id,
            },
            data: {
              account_balance:
                Number(customerSavingsAccount.account_balance) -
                req.initial_credit,
            },
          });
          await this.dbService.accounts.update({
            where: {
              id: account.id,
            },
            data: {
              account_balance: initial_credit,
            },
          });
        }
      }

      return ResponseManager.standardResponse({
        message: `Current account created!`,
        code: HttpStatus.OK,
        status: 'ok',
        data: account,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          message: error?.response || 'Unknown error has occured',
          status: 'error',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          data: error,
        },
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
