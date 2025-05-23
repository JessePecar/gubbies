/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { PrismaClient } from '@prisma/client';
import { AuthUtil } from './authUtils';
import { resetPassword as runReset } from './resetPasswords';
import { permissionGroupSeed, permissionSeed } from './data';
const client = new PrismaClient();

async function main() {
  const passwordFlag = process.env.RESET_PASSWORD;

  if (passwordFlag === 'true') {
    await runReset();
    return;
  }
  await client.$connect();

  const authUtil = new AuthUtil();

  const permissionGroup = (await client.permissionGroup.findMany()) ?? [];
  if (
    !permissionGroup ||
    permissionGroup.length !== permissionGroupSeed.length
  ) {
    console.log('Adding Permission groups to the db');

    const upsertPermGroupTasks = permissionGroupSeed.map((pgs) => {
      return client.permissionGroup.upsert({
        where: {
          id: pgs.id,
        },
        create: {
          name: pgs.name,
        },
        update: {
          name: pgs.name,
        },
      });
    });

    await Promise.all(upsertPermGroupTasks);
  }

  let permissions = await client.permissions.findMany();
  if (!permissions || permissions.length !== permissionSeed.length) {
    console.log('Adding permissions to the db');

    // Add or update the permission based on the seed
    // WILL NOT DELETE PERMISSIONS
    const upsertTasks = permissionSeed.map((ps) => {
      return client.permissions.upsert({
        where: {
          id: ps.id,
        },
        create: {
          name: ps.name,
          permissionGroupId: ps.permissionGroupId,
        },
        update: {
          name: ps.name,
          permissionGroupId: ps.permissionGroupId,
        },
      });
    });

    await Promise.all(upsertTasks);
  }

  permissions = await client.permissions.findMany();

  const roles = await client.roles.findMany();

  let newRole: any | undefined = undefined;
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
  } else {
    // Find all admins and ensure they have every permission
    const admins = roles.filter((nr) => nr.hierarchyTier === 1);

    const rolePermTasks = admins.map((admin) => {
      return Promise.all(
        permissionSeed.map((ps) => {
          return client.rolePermissions.upsert({
            where: {
              roleId_permissionId: {
                permissionId: ps.id,
                roleId: admin.id,
              },
            },
            create: {
              permissionId: ps.id,
              roleId: admin.id,
            },
            update: {
              permissionId: ps.id,
              roleId: admin.id,
            },
          });
        }),
      );
    });

    await Promise.all(rolePermTasks);
  }
  // Create the default admin user
  const users = await client.users.findMany();

  let address: any | undefined = undefined;
  let primaryPhone: any | undefined = undefined;
  if (!users || users.length < 1) {
    const addresses = await client.address.findMany();
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

    const phones = await client.phone.findMany();

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
