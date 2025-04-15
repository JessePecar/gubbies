import {
  effect,
  inject,
  Injectable,
  signal,
  untracked,
  WritableSignal,
} from '@angular/core';
import * as yup from 'yup';
import { BaseValidator } from '@/common/validators';
import { UserInfoService } from '@/services';
import { PermissionGroup } from '@/interfaces/settings/roles';
import { GetPermissionGroupsService } from '@/settings/roles/requests';

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
  // Injected services
  userInfoService = inject(UserInfoService);
  getPermissionGroups = inject(GetPermissionGroupsService);

  //
  permissions = signal<PermissionGroup[]>([]);

  constructor() {
    this.getPermissionGroups
      .fetch()
      .subscribe(({ data: { permissionGroups } }) => {
        const permissions = permissionGroups.flatMap(pg => pg.permissions);

        const permissionRecord: Record<string, yup.BooleanSchema> = {};
        const permissionRecordData: Record<string, boolean> = {};

        permissions.forEach(p => {
          permissionRecord[p.name] = yup.boolean();
          permissionRecordData[p.name] = false;
        });

        this.validator = yup.object().shape({
          name: yup
            .string()
            .required()
            .min(3, 'Role name must be at least 3 characters')
            .max(32, 'Role name must not exceed 32 characters'),
          hierarchyTier: yup
            .number()
            .required('A hierarchy tier must be provided')
            .moreThan(
              this.userInfoService.role()?.hierarchyTier ?? 99, // If user's role is undefined, this will prevent them from creating a role
              `Must create role in Tier ${this.userInfoService.role()?.hierarchyTier} or higher`
            )
            .lessThan(100, 'Hierarchy Tier must be below 99'),
          permissions: yup.object().shape(permissionRecord),
        });

        this.validatorSignal.set(this.validator);
        this.initialDataSignal.set({
          ...this.initialData,
          permissions: permissionRecordData,
        });
      });
  }

  validator!: yup.ObjectSchema<RoleSchema>;

  validatorSignal: WritableSignal<yup.ObjectSchema<RoleSchema>> = signal(
    yup.object().shape({})
  );

  initialData: RoleSchema = {
    name: '',
    hierarchyTier: 0,
    permissions: {},
  };

  initialDataSignal = signal<RoleSchema>({});
}
