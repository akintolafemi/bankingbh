import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.customers.create({
    data: {
      customer_id: 'ad4501a3-233b-41d6-8d80-0e6e0a4ae2b4',
      full_name: 'Jane Doe',
      email: 'janedoe@gmail.com',
      accounts: {
        create: {
          account_number: '001122334455',
          account_balance: '5000.00',
          account_type: 'savings',
        },
      },
    },
  });
  await prisma.customers.create({
    data: {
      customer_id: '639da415-bd0e-4807-a4e8-6979c1910c25',
      full_name: 'Micheal Oluwafemi',
      email: 'michealakintola106.pog@gmail.com',
      accounts: {
        create: {
          account_number: '1020304050',
          account_balance: '4000.00',
          account_type: 'savings',
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
