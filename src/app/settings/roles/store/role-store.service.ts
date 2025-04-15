import {
  PermissionGroup,
  RolePermissionUpdate,
  UpdateRole,
} from '@/interfaces/settings/roles';
import { GetPermissionGroupsService } from '@/settings/roles/requests';
import { RoleSchema, RoleValidator } from '@/settings/roles/validators';
import { FormHandler, YupFormControls } from '@/common/validators';
import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObjectSchema } from 'yup';
import { Permission } from '@/interfaces/settings/roles';
@Injectable({
  providedIn: 'root',
})
export class RoleStoreService {
  private readonly roleValidator = inject(RoleValidator);
  private readonly permissionsService = inject(GetPermissionGroupsService);
  private readonly formBuilder = inject(FormBuilder);

  permissions = signal<Permission[]>([]);
  permissionGroups = signal<PermissionGroup[]>([]);

  form: FormGroup<YupFormControls<RoleSchema>> = this.formBuilder.group({});

  setupForm(initData: RoleSchema, validator: ObjectSchema<RoleSchema>) {
    console.log('Setting up the form again');
    const formData: RoleSchema = initData;

    this.form = FormHandler.formControls<RoleSchema>(formData);
    this.form.setValidators(FormHandler.validate<RoleSchema>(validator));
  }

  constructor() {
    this.permissionsService
      .fetch()
      .subscribe(({ data: { permissionGroups } }) => {
        this.permissions.set(permissionGroups.flatMap(pg => pg.permissions));
        this.permissionGroups.set(permissionGroups);
      });

    effect(() => {
      const validator = this.roleValidator.validatorSignal();
      const initData = this.roleValidator.initialDataSignal();

      untracked(() => {
        this.setupForm(initData, validator);
      });
    });
  }

  populateForm(role: RoleSchema) {
    this.setupForm(role, this.roleValidator.validator);
  }

  schemaToCreateObject(role: RoleSchema, id: number) {
    const rolePermissions = Object.keys(role.permissions)
      .filter(key => {
        return role.permissions[key];
      })
      .map(key => {
        const permissions = this.permissions();
        const keyedPermission = permissions.find(perm => perm.name === key);

        if (keyedPermission?.id === undefined) {
          throw 'role-store.service.ts: keyedPermission is undefined';
        }

        return {
          permissionId: keyedPermission!.id,
        } as RolePermissionUpdate;
      });

    return {
      id: id,
      hierarchyTier: role.hierarchyTier,
      name: role.name,
      rolePermissions: rolePermissions,
    } as UpdateRole;
  }
}
