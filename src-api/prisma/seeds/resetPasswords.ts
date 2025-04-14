import { PrismaClient } from '@prisma/client';
import { AuthUtil } from '../../src/utilities';

const client = new PrismaClient();

// This is a seeding function to reset all the passwords to 'password'
// ATTENTION: ONLY RUN LOCALLY
export async function resetPassword() {
  console.log('### Reseting the passwords ###');

  const authUtil = new AuthUtil();
  await client.$connect();

  await client.users.updateMany({
    data: {
      password: await authUtil.hashPassword('password'),
    },
  });
}
