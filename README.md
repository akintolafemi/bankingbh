<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[bankingbh] bankingbh API to be used for opening a new "current account" of already existing customers. It contains the following endpoints

1. [Current account creation](http://localhost:3001/api/v1/open-current-account) [POST]
2. [Fetch Customer Accounts and Details](http://localhost:3001/api/v1/customer/:customer_id) [GET]
3. [Fetch Account Transactions](http://localhost:3001/api/v1/transactions/:account_number) [GET]

### Technologies Used

- **ORM**: Prisma
- **Database**: Sqlite
- **Authentication**: Bearer Token

## Project setup

After pulling the repo, follow these steps to set up the project:

1. From your terminal, change directory to the root directory of the project.
2. Create `.env` file with variable names from `env.sample`.
3. Install packages

```bash
$ npm install
```

4. Create database and seed data to it. See below for seeded records

```bash
$ npx prisma migrate deploy
```

4. Start the project

```bash
$ npm run start:dev
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com).
- [Prisma Documentation](http://prisma.io).

# bankingbh

## Seeded Data

# Customers

[{
customer_id: 'ad4501a3-233b-41d6-8d80-0e6e0a4ae2b4',
full_name: 'Jane Doe',
email: 'janedoe@gmail.com'
}, {
customer_id: '639da415-bd0e-4807-a4e8-6979c1910c25',
full_name: 'Micheal Oluwafemi',
email: 'michealakintola106.pog@gmail.com'
}]

# Accounts

[{
customer_id: 'ad4501a3-233b-41d6-8d80-0e6e0a4ae2b4'
account_number: '001122334455',
account_balance: '5000.00',
account_type: 'savings',
}, {
customer_id: '639da415-bd0e-4807-a4e8-6979c1910c25',
account_number: '1020304050',
account_balance: '4000.00',
account_type: 'savings',
}]
