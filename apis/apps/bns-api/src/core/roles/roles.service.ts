/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RolePermissionInput, UpsertRoleInput } from '@bns/graphql.schema';
import { RepositoryService } from '@bns/common/repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor(private readonly repository: RepositoryService) {}

  async getRoles() {
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

  async getRoleTiers() {
    return (
      await this.repository.roles.findMany({
        select: {
          hierarchyTier: true,
        },
        where: {
          hierarchyTier: {
            not: undefined,
          },
        },
        distinct: 'hierarchyTier',
      })
    ).map((role) => ({
      tierNumber: role.hierarchyTier,
    }));
  }

  async seedPermissions() {
    const permissions = await this.getPermissions();

    if (permissions.length > 0) return;

    throw new Error('Permission Seeding has not been run');
  }

  async getPermissions() {
    return await this.repository.permissions.findMany();
  }

  async getPermissionGroups() {
    return await this.repository.permissionGroup.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async mergeRolePermissions(
    rolePermissionInput: RolePermissionInput[],
    roleId: number,
  ) {
    if (roleId === -1) return;

    await this.seedPermissions();

    const permissionIds = rolePermissionInput.map((rpi) => rpi.permissionId);

    const rolePerms = await this.repository.rolePermissions.findMany({
      where: {
        roleId: {
          equals: roleId,
        },
      },
    });

    // Get the rolePerms to delete
    const deletePerms: number[] = [];
    const createPerms: number[] = [];

    permissionIds.forEach((permId) => {
      // If we don't find the perm, we will be adding
      if (!rolePerms.some((rp) => rp.permissionId === permId)) {
        // Create the role permission record
        createPerms.push(permId);
      }

      // Else the role perm exists so we don't do anything
    });

    rolePerms.forEach((rolePerm) => {
      // If the database has the value that the list doesn't we will delete
      if (!permissionIds.some((pi) => pi === rolePerm.permissionId)) {
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
    const role = await this.repository.roles.upsert({
      where: {
        id: upsertRole.id === null || upsertRole.id === 0 ? -1 : upsertRole.id,
      },
      update: {
        hierarchyTier: upsertRole.hierarchyTier,
        name: upsertRole.name,
      },
      create: {
        id:
          upsertRole.id === null || upsertRole.id === 0
            ? undefined
            : upsertRole.id, // If role id is null, or 0, auto generate
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

    await this.mergeRolePermissions(
      (upsertRole.rolePermissions ?? []) as RolePermissionInput[],
      role.id ?? -1,
    );

    return await this.getRole(upsertRole.id ?? -1);
  }
}
