import { GlobalAlertService } from '@/components/alert/global-alert.service';
import {
  Address,
  CreateUser,
  Phone,
  UpdateUser,
  User,
} from '@/interfaces/settings/users';
import { FieldMetchValidator } from '@/utilities/FieldMatchValidator';
import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  CreateUserService,
  GetUserService,
  UpdateUserService,
} from '@/settings/users/requests';
import { GetRolesService } from '@/settings/roles';

export type UserFormGroupNames = 'info' | 'address' | 'primaryPhone';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertService = inject(GlobalAlertService);

  private readonly updateUserService = inject(UpdateUserService);
  private readonly getUserService = inject(GetUserService);
  private readonly getRolesService = inject(GetRolesService);

  readonly router = inject(Router);

  form = this.formBuilder.group({});
  currentUser = signal<UpdateUser | undefined>(undefined);

  isLoading = true;

  getRolesForDropdown() {
    return this.getRolesService.watch().valueChanges;
  }

  getUser(id: number) {
    return this.getUserService.watch({
      id: id,
    }).valueChanges;
  }

  updateUser({
    info: { firstName, lastName, userName, emailAddress, isActive, roleId },
    address,
    primaryPhone,
  }: Record<UserFormGroupNames, any>) {
    this.currentUser.set({
      id: this.currentUser()?.id ?? 0,
      roleId: roleId,
      firstName,
      lastName,
      userName,
      address: {
        id: this.currentUser()?.address?.id ?? 0, // This should bring over the id
        ...address, // This should fill out everything that was included in the form
        postalCode: Number(address.postalCode),
      } as Address,
      emailAddress,
      isActive,
      primaryPhone: {
        id: this.currentUser()?.primaryPhone?.id ?? 0,
        ...primaryPhone, // This should fill out everything that was included in the form
        nationalDigits: '+1' + primaryPhone.rawDigits,
      } as Phone,
    });

    return this.updateUserService
      .mutate({
        variables: {
          updatedUser: this.currentUser() as UpdateUser,
        },
      })
      .subscribe(res => {
        if (res.errors && res.errors.length > 0) {
          // Show Errors
          this.alertService.addAlert('error', 'Error updating user', 2000);
        } else {
          this.alertService.addAlert(
            'success',
            'Successfully updated user',
            2000
          );
          this.router.navigate(['settings/users/list']);
        }
      });
  }

  populateForm(id?: number) {
    // If id is not undefined, the user id was given for an edit function
    if (id) {
      this.getUser(id).subscribe(({ data: { user } }) => {
        this.form = this.sharedForm(user);
        this.currentUser.set(user);
        this.isLoading = false;
      });
    }
    // Else, we are creating a new user, so we will populate the form with a blank user
    else {
      var newUser: User = {
        id: 0,
        firstName: '',
        lastName: '',
        roleId: 0,
        userName: '',
        password: '',
        emailAddress: '',
        isActive: false,
        role: {
          id: 0,
          hierarchyTier: 99,
          name: '',
          rolePermissions: [],
          users: [],
        },
      };

      this.form = this.sharedForm(newUser);
      this.currentUser.set(newUser);
      this.isLoading = false;
    }
  }

  sharedForm(user: User): FormGroup {
    return this.formBuilder.group<Record<UserFormGroupNames, FormGroup>>({
      info: this.getInfoGroup(user),
      address: this.getAddressGroup(user.address),
      primaryPhone: this.getPhoneGroup(user.primaryPhone),
    });
  }

  getAddressGroup(address?: Address) {
    return this.formBuilder.group({
      address1: [
        address?.address1,
        [
          Validators.required,
          Validators.maxLength(64),
          Validators.minLength(2),
        ],
      ],
      address2: [address?.address2, [Validators.nullValidator]],
      city: [
        address?.city,
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(2),
        ],
      ],
      state: [
        address?.state,
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.minLength(4),
        ],
      ],
      countryCode: [
        address?.countryCode,
        [Validators.required, Validators.maxLength(2), Validators.minLength(2)],
      ],
      postalCode: [
        address?.postalCode,
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
    });
  }

  getPhoneGroup(phone?: Phone) {
    return this.formBuilder.group({
      rawDigits: [
        phone?.rawDigits,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
    });
  }

  getInfoGroup(user: User) {
    return this.formBuilder.group(
      {
        userName: [
          user.userName,
          [
            Validators.required,
            Validators.maxLength(12),
            Validators.minLength(3),
          ],
        ],
        firstName: [
          user.firstName,
          [
            Validators.required,
            Validators.maxLength(32),
            Validators.minLength(2),
          ],
        ],
        lastName: [
          user.lastName,
          [
            Validators.required,
            Validators.maxLength(32),
            Validators.minLength(2),
          ],
        ],
        emailAddress: [
          user.emailAddress,
          [Validators.required, Validators.email],
        ],
        isActive: [user.isActive],
        roleId: [user.roleId, [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]], // TODO: Add special characters validators
        passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validator: FieldMetchValidator.matchField(
          'password',
          'passwordConfirm'
        ),
      }
    );
  }

  constructor() {}
}
