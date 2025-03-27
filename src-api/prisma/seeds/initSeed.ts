import { PrismaClient } from '@prisma/client';
import { AuthUtil } from '../../src/utilities';
import { parseArgs } from 'node:util';
import { resetPassword as runReset } from './resetPasswords';
const client = new PrismaClient();

const {
  values: { resetPassword },
} = parseArgs({
  options: {
    resetPassword: {
      type: 'boolean',
    },
  },
  args: ['--resetPassword'],
});

async function main() {
  var passwordFlag = process.env.RESET_PASSWORD;

  if (resetPassword || passwordFlag === 'true') {
    await runReset();
    return;
  }
  client.$connect;

  var authUtil = new AuthUtil();

  var permissions = await client.permissions.findMany();
  if (!permissions || permissions.length < 1) {
    console.log('Adding permissions to the db');
    await client.permissions.createMany({
      data: [
        {
          id: 1,
          name: 'APPLICATION_LOGIN',
        },
        {
          id: 2,
          name: 'INVENTORY',
        },
        {
          id: 3,
          name: 'INVENTORY_ADJUSTMENTS',
        },
        {
          id: 4,
          name: 'INVENTORY_COUNTS',
        },
        {
          id: 5,
          name: 'PRICING',
        },
        {
          id: 6,
          name: 'PROMOTIONS',
        },
        {
          id: 7,
          name: 'REPORTS',
        },
        {
          id: 8,
          name: 'REPORTS_INVENTORY',
        },
        {
          id: 9,
          name: 'REPORTS_PRICING',
        },
        {
          id: 10,
          name: 'REPORTS_PROMOTIONS',
        },
        {
          id: 11,
          name: 'SETTINGS',
        },
        {
          id: 12,
          name: 'EDIT_USER',
        },
        {
          id: 13,
          name: 'CREATE_USER',
        },
        {
          id: 14,
          name: 'EDIT_ROLE',
        },
        {
          id: 15,
          name: 'CREATE_ROLE',
        },
      ],
    });
  }

  permissions = await client.permissions.findMany();

  var roles = await client.roles.findMany();
  var newRole: any | undefined = undefined;
  if (!roles || roles.length < 1) {
    // Create an admin role
    newRole = await client.roles.create({
      data: {
        name: 'Administrator',
        hierarchyTier: 1,
      },
    });

    await client.rolePermissions.createMany({
      data: permissions.map((p) => {
        return {
          permissionId: p.id,
          roleId: newRole.id,
        };
      }),
    });
  }
  // Create the default admin user
  var users = await client.users.findMany();

  var address: any | undefined = undefined;
  var primaryPhone: any | undefined = undefined;
  if (!users || users.length < 1) {
    var addresses = await client.address.findMany();
    if (!addresses || addresses.length < 1) {
      address = await client.address.create({
        data: {
          address1: '',
          city: '',
          state: '',
          countryCode: 'US',
          postalCode: 0,
        },
      });
    }

    var phones = await client.phone.findMany();

    if (!phones || phones.length < 1) {
      primaryPhone = await client.phone.create({
        data: {
          nationalDigits: '',
          rawDigits: '',
        },
      });
    }

    await client.users.create({
      data: {
        firstName: 'Admin',
        emailAddress: 'admin@gubbies.com',
        addressId: address?.id ?? 1,
        roleId: newRole?.id ?? 1,
        isActive: true,
        lastName: 'User',
        password: await authUtil.hashPassword('password'),
        userName: 'admin',
        primaryPhoneId: primaryPhone?.id ?? 1,
      },
    });
  } else {
    // We will change anybody with a plain text password of 'password' to a hashed password
    await client.users.updateMany({
      where: {
        password: {
          in: ['password', 'ffec5bfce2df0cda4bdebb70f89ab11b'],
        },
      },
      data: {
        password: await authUtil.hashPassword('password'),
      },
    });
  }
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
