import {
  ButtonComponent,
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
import { Permission, Role } from '@/interfaces/settings/roles';
import { UserInfoService } from '@/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-details',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    TextInputComponent,
    NumberInputComponent,
  ],
  template: `
    <div class="flex flex-col w-full h-full justify-center items-center">
      <div class="flex w-1/2">
        <p style="font-size: 2rem" class="py-2">Add / Edit Role</p>
      </div>
      @if (form) {
        <form
          class="flex flex-col justify-between w-1/2 min-h-96 bg-stone-900 rounded shadow p-4"
          [formGroup]="form"
          (ngSubmit)="onSubmit()">
          <p class="text-lg my-4">Information</p>
          <div class="grid grid-cols-3 gap-4">
            <app-text-input label="Name" formControlName="name" />
            <!-- TODO: Change to a number input -->
            <app-number-input
              label="Hierarchy Tier"
              formControlName="hierarchyTier" />
          </div>
          <p class="text-lg my-4">Permissions</p>
          <div class="w-full lg:w-1/2 grid grid-cols-2 gap-1 text-sm ">
            @for (permission of permissions(); track $index) {
              <div class="flex space-x-2">
                <input
                  [checked]="isPermissionEnabled(permission)"
                  type="checkbox" />
                <p>{{ permission.name }}</p>
              </div>
            }
          </div>
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
  `,
  styles: ``,
})
export class RoleDetailsComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  roleDetailsService = inject(RoleDetailsService);
  userInfoService = inject(UserInfoService);
  router = inject(Router);

  form: FormGroup | undefined;

  roleId = input<number | undefined>();

  permissions = signal<Permission[]>([]);

  role = signal<Role | undefined>(undefined);

  createForm(role?: Role) {
    var userHierarchyTier =
      this.userInfoService.userInfo()?.role.hierarchyTier ?? 99;

    this.form = this.formBuilder.group({
      name: [
        role?.name,
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(3),
        ],
      ],
      hierarchyTier: [
        role?.hierarchyTier,
        [
          Validators.required,
          Validators.min(userHierarchyTier + 1), // Can only create a role in the next tier lower
          Validators.max(100),
        ],
      ],
    });
  }

  // Checking if the permissions on the role exist based on the permission given
  isPermissionEnabled(permission: Permission) {
    return (
      this.role() &&
      this.role()?.rolePermissions.find(
        rp => rp.permission.id === permission.id
      )
    );
  }

  ngOnInit(): void {
    console.log(this.roleId());

    if (!this.roleId()) {
      this.createForm();
    }

    this.roleDetailsService
      .getPermissions()
      .subscribe(({ data: { permissions } }) => {
        this.permissions.set(permissions);
      });

    this.roleDetailsService
      .getRole(this.roleId())
      ?.subscribe(({ data: { role } }) => {
        this.role.set(role);
        this.createForm(role);
      });
  }

  onSubmit() {}

  onCancel() {
    this.router.navigate(['settings/roles/list']);
  }
}
