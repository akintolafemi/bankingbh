import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { OpenCurrentAccountDto } from './app.dtos';
import { ResponseManager, standardResponse } from './response.manager.utils';
import { generateAccountNumber } from './app.utils';

@Injectable()
export class AppService {
  constructor(private readonly dbService: DatabaseService) {}

  async openCustomerCurrentAccount(
    req: OpenCurrentAccountDto,
  ): Promise<standardResponse | HttpException> {
    try {
      const customer = await this.dbService.customers.findUnique({
        where: {
          customer_id: req.customer_id,
        },
      });
      if (!customer)
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);

      const existingCurrentAccount = await this.dbService.accounts.findFirst({
        where: {
          customer_id: req.customer_id,
          deleted: false,
          account_type: 'current',
        },
      });
      if (existingCurrentAccount)
        throw new HttpException(
          'Customer has an existing current account',
          HttpStatus.CONFLICT,
        );

      const account_number = generateAccountNumber();
      const account = await this.dbService.accounts.create({
        data: {
          customer_id: req.customer_id,
          account_number,
          account_type: 'current',
        },
      });

      if (req.initial_credit && Number(req.initial_credit) > 0) {
        const initial_credit = Number(req.initial_credit);
        const customerSavingsAccount = await this.dbService.accounts.findFirst({
          where: {
            customer_id: req.customer_id,
            deleted: false,
            account_type: 'savings',
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
          await this.dbService.transactions.create({
            data: {
              source_account_number: customerSavingsAccount.account_number,
              destination_account_number: account.account_number,
              amount: initial_credit,
            },
          });
        }
      }

      return ResponseManager.standardResponse({
        message: `Current account created!`,
        code: HttpStatus.OK,
        status: 'ok',
        data: {
          ...account,
          account_balance: req.initial_credit,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          message: error?.response || 'Unknown error has occured',
          status: 'error',
          code: error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        },
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchCustomerData(
    customer_id: string,
  ): Promise<standardResponse | HttpException> {
    try {
      const customer = await this.dbService.customers.findUnique({
        where: {
          customer_id,
          deleted: false,
        },
        include: {
          accounts: true,
        },
      });

      if (!customer)
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);

      return ResponseManager.standardResponse({
        message: `Customer data fetched successfully!`,
        code: HttpStatus.OK,
        status: 'ok',
        data: customer,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          message: error?.response || 'Unknown error has occured',
          status: 'error',
          code: error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        },
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchAccountTransactions(
    account_number: string,
  ): Promise<standardResponse | HttpException> {
    try {
      const transactions = await this.dbService.transactions.findMany({
        where: {
          OR: [
            {
              source_account_number: account_number,
            },
            {
              destination_account_number: account_number,
            },
          ],
          deleted: false,
        },
      });

      return ResponseManager.standardResponse({
        message: `Account transactions fetched successfully!`,
        code: HttpStatus.OK,
        status: 'ok',
        data: transactions,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          message: error?.response || 'Unknown error has occured',
          status: 'error',
          code: error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        },
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
