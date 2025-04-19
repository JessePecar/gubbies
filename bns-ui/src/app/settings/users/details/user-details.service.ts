import { GlobalAlertService } from '@/components/alert/global-alert.service';
import { Address, Phone, UpdateUser, User } from '@/interfaces/settings/users';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserQuery, UpdateUserMutation } from '@/settings/users/requests';
import { UserSchema } from '@/settings/users/validators';

export type UserFormGroupNames = 'info' | 'address' | 'primaryPhone';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private readonly alertService = inject(GlobalAlertService);

  private readonly updateUserMutation = inject(UpdateUserMutation);
  private readonly getUserQuery = inject(GetUserQuery);

  readonly router = inject(Router);

  currentUser = signal<UpdateUser | undefined>(undefined);

  getUser(id: number) {
    return this.getUserQuery.watch({
      id: id,
    }).valueChanges;
  }

  updateUser({
    info: { firstName, lastName, userName, emailAddress, isActive, roleId },
    address,
    primaryPhone,
  }: UserSchema) {
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

    return this.updateUserMutation
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
}
