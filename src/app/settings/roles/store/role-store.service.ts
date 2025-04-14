import { RolePermissionUpdate, UpdateRole } from '@/interfaces/settings/roles';
import { GetPermissionsService } from '@/settings/roles/requests';
import { RoleSchema, RoleValidator } from '@/settings/roles/validators';
import { FormHandler, YupFormControls } from '@/validators';
import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ObjectSchema } from 'yup';
import { Permission } from '@/interfaces/settings/roles';
import { assert } from 'node:console';

@Injectable({
  providedIn: 'root',
})
export class RoleStoreService {
  private readonly roleValidator = inject(RoleValidator);
  private readonly permissionsService = inject(GetPermissionsService);

  permissions = signal<Permission[]>([]);

  form!: FormGroup<YupFormControls<RoleSchema>>;

  setupForm(initData: RoleSchema, validator: ObjectSchema<RoleSchema>) {
    const formData: RoleSchema = initData;

    this.form = FormHandler.formControls<RoleSchema>(formData);
    this.form.setValidators(FormHandler.validate<RoleSchema>(validator));
  }

  constructor() {
    this.permissionsService.fetch().subscribe(({ data: { permissions } }) => {
      this.permissions.set(permissions);
    });

    this.setupForm(
      this.roleValidator.initialData,
      this.roleValidator.validator
    );

    effect(() => {
      const validator = this.roleValidator.validator;
      const initData = this.roleValidator.initialData;

      untracked(() => {
        this.setupForm(initData, validator);
      });
    });
  }

  populateForm(user: RoleSchema) {
    this.form = FormHandler.formControls<RoleSchema>(user);
    this.form.setValidators(
      FormHandler.validate<RoleSchema>(this.roleValidator.validator)
    );
  }

  schemaToCreateObject(role: RoleSchema, id: number) {
    const rolePermissions = Object.keys(role.permissions)
      .filter(key => {
        return role.permissions[key];
      })
      .map(key => {
        const permissions = this.permissions();
        const keyedPermission = permissions.find(perm => perm.name === key);

        assert(
          keyedPermission?.id !== undefined,
          'role-store.service.ts: keyedPermission is undefined'
        );

        return {
          permissionId: keyedPermission!.id,
        } as RolePermissionUpdate;
      });

    return {
      id: id,
      hierarchyTier: role.hierarchyTier,
      name: role.hierarchyTier,
      rolePermissions: rolePermissions,
    } as UpdateRole;
  }
}
