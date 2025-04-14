import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import * as yup from 'yup';
import { BaseValidator } from '@/validators';
import { UserInfoService } from '@/services';
import { GetPermissionsService } from '@/settings/roles';
import { Permission } from '@/interfaces/settings/roles';

export type RoleSchema =
  | {
      name: string;
      hierarchyTier: number;
      permissions: Record<string, boolean>;
    }
  | yup.AnyObject;

@Injectable({
  providedIn: 'root',
})
export class RoleValidator implements BaseValidator<RoleSchema> {
  userInfoService = inject(UserInfoService);
  getPermissionsService = inject(GetPermissionsService);

  permissions = signal<Permission[]>([]);
  constructor() {
    effect(() => {
      const permissions = this.permissions();
      untracked(() => {
        const permissionRecord: Record<string, yup.BooleanSchema> = {};

        // TODO: I will be updating this to have roles in groups, will need to tweak this logic when that happens
        permissions.forEach(p => {
          permissionRecord[p.name] = yup.boolean();
        });

        // Do some work around the permissions list
        this.validator = yup.object().shape({
          name: yup
            .string()
            .required()
            .min(3, 'Role name must be at least 3 characters')
            .max(32, 'Role name must not exceed 32 characters'),
          hierarchyTier: yup
            .number()
            .required()
            .min(
              (this.userInfoService.role()?.hierarchyTier ?? 99) + 1, // If user's role is undefined, this will prevent them from creating a role
              "Cannot create role in current user's tier or higher"
            )
            .max(99, 'Hierarchy Tier must be below 99'),
          permissions: yup.object().shape(permissionRecord),
        });
      });
    });

    this.getPermissionsService
      .fetch()
      .subscribe(({ data: { permissions } }) => {
        this.permissions.set(permissions);
      });
  }

  validator = yup.object().shape({
    name: yup
      .string()
      .required()
      .min(3, 'Role name must be at least 3 characters')
      .max(32, 'Role name must not exceed 32 characters'),
    hierarchyTier: yup
      .number()
      .required()
      .min(
        (this.userInfoService.role()?.hierarchyTier ?? 99) + 1, // If user's role is undefined, this will prevent them from creating a role
        "Cannot create role in current user's tier or higher"
      )
      .max(99, 'Hierarchy Tier must be below 99'),
    permissions: yup.object().shape({}),
  });

  initialData: RoleSchema = {
    name: '',
    hierarchyTier: 0,
    permissions: {},
  };
}
