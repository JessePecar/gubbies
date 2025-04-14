import {
  CheckboxComponent,
  NumberInputComponent,
  TextInputComponent,
} from '@/components';
import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RoleDetailsService } from './role-details.service';
import { Permission, Role } from '@/interfaces/settings/roles';
import { UserInfoService } from '@/services';
import { Router } from '@angular/router';
import { ButtonComponent } from '@/components/buttons';
import { RoleStoreService } from '@/settings/roles/store';
import { RoleSchema } from '@/settings/roles/validators';

//TODO: Move a lot of the logic for fetching into the service

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
        @if (this.roleStore.form !== undefined) {
          <form
            class="flex flex-col justify-between w-1/2 min-h-96 bg-primary-dark rounded shadow p-4"
            [formGroup]="roleStore.form"
            (ngSubmit)="onSubmit()">
            <p class="text-lg my-4">Information</p>
            <div class="grid grid-cols-3 gap-4">
              <app-text-input label="Name" formControlName="name" />

              <app-number-input
                label="Hierarchy Tier"
                formControlName="hierarchyTier" />
            </div>
            @if (
              roleStore.form.get('permissions') &&
                roleDetailsService.permissionGroups();
              as groups
            ) {
              <p class="text-lg my-4">Permissions</p>
              <div formArrayName="permissions">
                @for (group of groups; track group.id) {
                  <p>{{ group.name }}</p>
                  <div class="w-full lg:w-1/2 grid grid-cols-2 gap-1 text-sm">
                    @for (
                      permission of group.permissions;
                      track permission.id
                    ) {
                      <app-checkbox
                        [formControlName]="permission.name"
                        [label]="getPermissionName(permission)" />
                    }
                  </div>
                }
              </div>
            }

            <div class="flex justify-end space-x-4 h-10">
              <app-button
                (handleClick)="onCancel()"
                buttonType="outline"
                text="Cancel" />

              <app-button
                [disabled]="!roleStore.form.valid"
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
export class RoleDetailsComponent {
  formBuilder = inject(FormBuilder);
  roleDetailsService = inject(RoleDetailsService);
  roleStore = inject(RoleStoreService);
  userInfoService = inject(UserInfoService);
  router = inject(Router);

  roleId = input<number | undefined>();

  role = signal<Role | undefined>(undefined);

  isLoading = signal(true);

  // Checking if the permissions on the role exist based on the permission given
  isPermissionEnabled(permission: Permission) {
    return (
      this.role() !== undefined &&
      this.role() !== null &&
      this.role()?.rolePermissions.some(
        rp => rp.permission.id === permission.id
      )
    );
  }

  getPermissionName(permission: Permission) {
    return permission.name.replace('_', ' ') ?? '';
  }

  constructor() {
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
    this.isLoading.set(false);
  }

  onSubmit() {
    if (this.roleStore.form && this.roleStore.form.valid) {
      const formValue = this.roleStore.schemaToCreateObject(
        this.roleStore.form.value as RoleSchema,
        this.role()?.id ?? 0
      );

      this.roleDetailsService.updateRole(formValue);
    }
  }

  onCancel() {
    this.router.navigate(['settings/roles/list']);
  }
}
