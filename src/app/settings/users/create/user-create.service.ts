import { inject, Injectable } from '@angular/core';
import {
  UserDetailsService,
  UserFormGroupNames,
} from '@/settings/users/details/user-details.service';
import { CreateUserService } from '@/settings/users/requests';
import { Address, CreateUser, Phone } from '@/interfaces/settings/users';
import { GlobalAlertService } from '@/components/alert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserCreateService {
  private readonly userDetailsService = inject(UserDetailsService);
  private readonly createUserService = inject(CreateUserService);
  private readonly alertService = inject(GlobalAlertService);
  private readonly router = inject(Router);

  createUser({
    info: {
      firstName,
      lastName,
      userName,
      emailAddress,
      isActive,
      roleId,
      password,
    },
    address,
    primaryPhone,
  }: Record<UserFormGroupNames, any>) {
    this.userDetailsService.currentUser.set({
      id: this.userDetailsService.currentUser()?.id ?? 0,
      roleId: roleId,
      password: password,
      firstName,
      lastName,
      userName,
      address: {
        id: this.userDetailsService.currentUser()?.address?.id ?? 0, // This should bring over the id
        ...address, // This should fill out everything that was included in the form
        postalCode: Number(address.postalCode),
      } as Address,
      emailAddress,
      isActive,
      primaryPhone: {
        id: this.userDetailsService.currentUser()?.primaryPhone?.id ?? 0,
        ...primaryPhone, // This should fill out everything that was included in the form
        nationalDigits: '+1' + primaryPhone.rawDigits,
      } as Phone,
    });

    return this.createUserService
      .mutate({
        variables: {
          updatedUser: this.userDetailsService.currentUser() as CreateUser,
        },
      })
      .subscribe(res => {
        if (res.errors && res.errors.length > 0) {
          // Show Errors
          this.alertService.addAlert('error', 'Error adding user', 2000);
        } else {
          this.alertService.addAlert(
            'success',
            'Successfully added user',
            2000
          );
          this.router.navigate(['settings/users/list']);
        }
      });
  }
}
