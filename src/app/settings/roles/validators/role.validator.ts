import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import * as yup from 'yup';
import { BaseValidator, YupFormControls } from '@/validators';
import { UserInfoService } from '@/services';
import { Permission } from '@/interfaces/settings/roles';
import { PermissionEnum } from '@/entities/role';

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

  permissions = signal<Permission[]>([]);

  constructor() {
    const permissionRecord: Record<string, yup.BooleanSchema> = {};

    Object.keys(PermissionEnum).forEach(permission => {
      permissionRecord[permission] = yup.boolean();
    });

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
  }

  validator!: yup.ObjectSchema<RoleSchema>;

  initialData: RoleSchema = {
    name: '',
    hierarchyTier: 0,
    permissions: {},
  };
}
