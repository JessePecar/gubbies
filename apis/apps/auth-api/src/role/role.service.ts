/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { permissionGroupSeed, permissionSeed, roleSeed } from '@auth/seed';
import { AuthClientService } from '@core/repository';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Role, RolePermission } from '@auth/role';

@Injectable()
export class RoleService implements OnApplicationBootstrap {
  constructor(private readonly repository: AuthClientService) {}

  async getRoles() {
    return await this.repository.role.findMany({
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
    return await this.repository.role.findFirst({
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
      await this.repository.role.findMany({
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

  async getPermissions() {
    return await this.repository.permission.findMany();
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

    const rolePerms = await this.repository.rolePermission.findMany({
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
      await this.repository.rolePermission.deleteMany({
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
      await this.repository.rolePermission.createMany({
        data: createPerms.map((cp) => {
          return {
            permissionId: cp,
            roleId: roleId,
          };
        }),
      });
    }
  }

  async upsertRole(upsertRole: Role) {
    const role = await this.repository.role.upsert({
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
      (upsertRole.rolePermissions ?? []) as RolePermission[],
      role.id ?? -1,
    );

    return await this.getRole(upsertRole.id ?? -1);
  }

  async onApplicationBootstrap() {
    // Check if permission group
    let permissionGroups = await this.repository.permissionGroup.findMany();
    if (!!!permissionGroups.length) {
      await this.repository.permissionGroup.createMany({
        data: permissionGroupSeed,
      });

      permissionGroups = await this.repository.permissionGroup.findMany();
    }

    let permissions = await this.repository.permission.findMany();
    if (!!!permissions.length) {
      await this.repository.permission.createMany({
        data: permissionSeed.map((ps) => ({
          name: ps.name,
          permissionGroupId: permissionGroups.find(
            (pg) => pg.name === ps.permissionGroupName,
          )!.id,
        })),
      });

      permissions = await this.repository.permission.findMany();
    }

    if (!!!(await this.repository.role.findMany()).length) {
      // Add Role
      const role = await this.repository.role.create({
        data: roleSeed,
      });

      // Add Role Permissions
      await this.repository.rolePermission.createMany({
        data: permissions.map((perm) => ({
          roleId: role.id,
          permissionId: perm.id,
        })),
      });
    }
  }
}
