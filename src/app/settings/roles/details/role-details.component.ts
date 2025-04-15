import { NumberInputComponent, TextInputComponent } from '@/components';
import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoleDetailsService } from './role-details.service';
import { Permission, Role } from '@/interfaces/settings/roles';
import { UserInfoService } from '@/services';
import { Router } from '@angular/router';
import { ButtonComponent } from '@/components/buttons';
import { RoleStoreService } from '@/settings/roles/store';
import { RoleSchema, RoleValidator } from '@/settings/roles/validators';
import { TableComponent } from '@/components/tables/table.component';
import { SwitchInputComponent } from '@/components/inputs/switch-input.component';

//TODO: Move a lot of the logic for fetching into the service

@Component({
  selector: 'app-role-details',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    TextInputComponent,
    NumberInputComponent,
    TableComponent,
    SwitchInputComponent,
  ],
  template: `
    @if (isLoading() === false) {
      <div
        class="flex flex-col w-full h-full justify-center items-center max-h-1/2">
        <div class="flex w-1/2">
          <p style="font-size: 2rem" class="py-2">Add / Edit Role</p>
        </div>
        @if (
          roleStore.form.get('name') && roleStore.form.get('hierarchyTier')
        ) {
          <form
            class="flex flex-col justify-between w-1/2 min-h-96 p-4"
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
              roleStore.form.contains('permissions') &&
                roleStore.permissionGroups();
              as groups
            ) {
              <app-table class="max-h-96">
                <p header class="text-lg">Permissions</p>
                <div formArrayName="permissions" class="w-full text-sm">
                  @for (group of groups; track $index) {
                    <div>
                      <div class="p-4 w-full border-b border-primary-dark">
                        <p class="font-bold">{{ group.name }}</p>
                      </div>
                      <div class="w-full grid grid-cols-3 gap-1 text-sm pt-2">
                        @for (permission of group.permissions; track $index) {
                          <app-switch-input
                            [formControlName]="permission.name"
                            [label]="getPermissionName(permission)" />
                        }
                      </div>
                    </div>
                  }
                </div>
              </app-table>
            }

            <div class="flex justify-end space-x-4 h-10">
              <app-button
                (handleClick)="onCancel()"
                buttonType="text"
                text="Cancel" />

              <app-button
                [disabled]="!roleStore.form.valid"
                (handleClick)="onSubmit()"
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
  roleValidator = inject(RoleValidator);
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
    let permissionName = permission.name.split('_');
    permissionName = permissionName.map(pn => {
      const lowercaseString = pn.substring(1, pn.length).toLocaleLowerCase();

      return `${pn[0]}${lowercaseString}`;
    });

    return permissionName.join(' ');
  }

  isFormPermissionSet(permissionName: string) {
    return (this.roleStore.form.get('permissions') as FormGroup).contains(
      permissionName
    );
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
    console.log(this.roleStore.form);
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
