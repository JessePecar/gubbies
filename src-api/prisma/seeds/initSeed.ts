import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function main() {
  client.$connect;

  var permissions = await client.permissions.findMany();
  if (!permissions || permissions.length < 1) {
    console.log("Adding permissions to the db");
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

  if(!roles || roles.length < 1) {
    // Create an admin role
    var newRole = await client.roles.create({
      data: {
        name: 'Administrator',
        hierarchyTier: 1,
      }
    });

    await client.rolePermissions.createMany({
      data: permissions.map(p => {
        return {
          permissionId: p.id,
          roleId: newRole.id
        }
      })
    });
  }
}

main()
  .then(async () => {
    await client.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await client.$disconnect()
    process.exit(1)
  })
