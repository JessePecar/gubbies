import {
  CheckboxComponent,
  NumberInputComponent,
  TextInputComponent,
} from '@/components';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoleDetailsService } from './role-details.service';
import {
  Permission,
  Role,
  RolePermissionUpdate,
} from '@/interfaces/settings/roles';
import { UserInfoService } from '@/services';
import { Router } from '@angular/router';
import { ButtonComponent } from '@/components/buttons';

@Component({
  selector: 'app-role-details',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    TextInputComponent,
    NumberInputComponent,
    CheckboxComponent,
  ],
  template: `
    @if (isLoading() === false) {
      <div class="flex flex-col w-full h-full justify-center items-center">
        <div class="flex w-1/2">
          <p style="font-size: 2rem" class="py-2">Add / Edit Role</p>
        </div>
        @if (form !== undefined) {
          <form
            class="flex flex-col justify-between w-1/2 min-h-96 bg-stone-900 rounded shadow p-4"
            [formGroup]="form"
            (ngSubmit)="onSubmit()">
            <p class="text-lg my-4">Information</p>
            <div class="grid grid-cols-3 gap-4">
              <app-text-input label="Name" formControlName="name" />

              <app-number-input
                label="Hierarchy Tier"
                formControlName="hierarchyTier" />
            </div>
            @if (form.get('permissions')) {
              <p class="text-lg my-4">Permissions</p>
              <div
                formArrayName="permissions"
                class="w-full lg:w-1/2 grid grid-cols-2 gap-1 text-sm">
                @for (permission of permissions(); track $index) {
                  <app-checkbox
                    [formControlName]="permission.name"
                    [label]="getPermissionName(permission)" />
                }
              </div>
            }

            <div class="flex justify-end space-x-4 h-10">
              <app-button
                (handleClick)="onCancel()"
                buttonType="outline"
                text="Cancel" />

              <app-button
                [disabled]="!form.valid"
                buttonType="raised"
                text="Submit">
              </app-button>
            </div>
          </form>
        }
      </div>
    } @else {
      <strong>Loading...</strong>
    }
  `,
})
export class RoleDetailsComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  roleDetailsService = inject(RoleDetailsService);
  userInfoService = inject(UserInfoService);
  router = inject(Router);

  form: FormGroup | undefined = undefined;
  roleId = input<number | undefined>();

  permissions = signal<Permission[]>([]);

  role = signal<Role | undefined>(undefined);

  isLoading = signal(true);

  createForm() {
    var userHierarchyTier =
      this.userInfoService.userInfo()?.role.hierarchyTier ?? 99;

    var permissionGroup = this.createPermissionForm();

    this.form = this.formBuilder.group({
      name: [
        this.role()?.name,
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(3),
        ],
      ],
      hierarchyTier: [
        this.role()?.hierarchyTier,
        [
          Validators.required,
          Validators.min(userHierarchyTier + 1), // Can only create a role in the next tier lower
          Validators.max(100),
        ],
      ],
      permissions: permissionGroup,
    });
  }

  createPermissionForm() {
    // This should translate the array to a dictionary with key = permission name
    // The value will be an array with the default value set to isPermissionEnabled(permission)
    var permissionGroup: any = {};

    this.permissions().forEach(p => {
      permissionGroup[p.name] = this.formBuilder.control(
        this.isPermissionEnabled(p),
        {
          validators: [Validators.required],
        }
      );
    });

    return this.formBuilder.group(permissionGroup);
  }

  // Checking if the permissions on the role exist based on the permission given
  isPermissionEnabled(permission: Permission) {
    return (
      this.role() !== undefined &&
      this.role() !== null &&
      this.role()?.rolePermissions.find(
        rp => rp.permission.id === permission.id
      ) !== undefined
    );
  }

  getPermissionName(permission: Permission) {
    return permission.name.replace('_', ' ') ?? '';
  }

  ngOnInit(): void {
    if (!this.roleId()) {
      this.getApplicationPermissions();
    }

    this.roleDetailsService
      .getRole(this.roleId())
      ?.subscribe(({ data: { role } }) => {
        this.role.set(role);

        this.getApplicationPermissions();
      });
  }

  getApplicationPermissions() {
    this.roleDetailsService
      .getPermissions()
      .subscribe(({ data: { permissions } }) => {
        this.permissions.set(permissions);
        this.createForm();

        this.isLoading.set(false);
      });
  }

  onSubmit() {
    if (this.form && this.form.valid) {
      var formValue = this.form.value;

      var permissionIds = Object.keys(formValue.permissions)
        .filter(key => {
          // If the value in the key field isn't in the permissions list, we will not add to the permission id list
          if (this.permissions().find(p => p.name === key)) {
            // If the value is true, we will add it, else we will ignore it
            return formValue.permissions[key];
          }

          // Default to false to ignore it
          return false;
        })
        .map(key => {
          // TODO: Change the p.name to p.id when we switch over to using the id
          // We know that the permission will exist, so we will use the '!'
          return {
            permissionId: this.permissions().find(p => p.name === key)!.id,
          } as RolePermissionUpdate;
        });

      this.roleDetailsService.updateRole({
        name: formValue.name,
        hierarchyTier: formValue.hierarchyTier,
        id: this.role()?.id ?? 0,
        rolePermissions: permissionIds,
      });
    }
  }

  onCancel() {
    this.router.navigate(['settings/roles/list']);
  }
}
