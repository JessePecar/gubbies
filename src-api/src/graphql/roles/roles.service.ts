import { Injectable } from '@angular/core';
import { RolePermissionInput, UpsertRoleInput } from 'src/graphql.schema';
import { RepositoryService } from 'src/repository';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private readonly repository: RepositoryService) {}

  async getRoles() {
    console.log(await this.repository.roles.findMany());

    return await this.repository.roles.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  async getRole(id: number) {
    return await this.repository.roles.findFirst({
      include: {
        rolePermissions: {
          include: {
            permission: true,
          },
        },
      },
      where: {
        id: {
          equals: id,
        },
      },
    });
  }

  async seedPermissions() {
    var permissions = await this.repository.permissions.findMany();

    if (permissions.length > 0) return;

    await this.repository.permissions.createMany({
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

  async mergeRolePermissions(
    rolePermissionInput: RolePermissionInput[],
    roleId: number,
  ) {
    if (roleId === -1) return;

    await this.seedPermissions();

    var permissionIds = rolePermissionInput.map((rpi) => rpi.permissionId);

    var rolePerms = await this.repository.rolePermissions.findMany({
      where: {
        roleId: {
          equals: roleId,
        },
      },
    });

    // Get the rolePerms to delete
    var deletePerms: number[] = [];
    var createPerms: number[] = [];

    permissionIds.forEach((permId) => {
      // If we don't find the perm, we will be adding
      if (!rolePerms.find((rp) => rp.permissionId === permId)) {
        // Create the role permission record
        createPerms.push(permId);
      }

      // Else the role perm exists so we don't do anything
    });

    rolePerms.forEach((rolePerm) => {
      // If the database has the value that the list doesn't we will delete
      if (!permissionIds.find((pi) => pi === rolePerm.permissionId)) {
        deletePerms.push(rolePerm.permissionId);
      }
    });

    if (deletePerms) {
      await this.repository.rolePermissions.deleteMany({
        where: {
          AND: {
            roleId: roleId,
            permissionId: {
              in: deletePerms,
            },
          },
        },
      });
    }

    if (createPerms) {
      await this.repository.rolePermissions.createMany({
        data: createPerms.map((cp) => {
          return {
            permissionId: cp,
            roleId: roleId,
          };
        }),
      });
    }
  }

  async upsertRole(upsertRole: UpsertRoleInput) {
    await this.mergeRolePermissions(
      (upsertRole.rolePermissions ?? []) as RolePermissionInput[],
      upsertRole.id ?? -1,
    );

    return await this.repository.roles.upsert({
      where: {
        id: upsertRole.id ?? -1,
      },
      update: {
        hierarchyTier: upsertRole.hierarchyTier,
        name: upsertRole.name,
      },
      create: {
        id: upsertRole.id ?? 1, // This is temporary, this will autogenerate normally
        hierarchyTier: upsertRole.hierarchyTier,
        name: upsertRole.name,
      },
      include: {
        rolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }
}
