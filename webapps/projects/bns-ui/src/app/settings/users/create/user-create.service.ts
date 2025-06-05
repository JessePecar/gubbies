import { inject, Injectable } from '@angular/core';
import { UserDetailsService } from '@/settings/users/details/user-details.service';
import { CreateUserMutation } from '@/settings/users/requests';
import { Address, Phone } from '@/models/core';
import { Router } from '@angular/router';
import { handleResponse } from '@/bns-ui/utilities/GraphQLResponseHandler';
import { User } from '@/models/auth/user';
import { GlobalAlertService } from '@/core/components/alert';

@Injectable({
  providedIn: 'root',
})
export class UserCreateService {
  private readonly userDetailsService = inject(UserDetailsService);
  private readonly createUserMutation = inject(CreateUserMutation);
  private readonly alertService = inject(GlobalAlertService);
  private readonly router = inject(Router);

  createUser(user: User) {
    const { address, primaryPhone } = user;

    this.userDetailsService.currentUser.set({
      ...(user as User),
      address: {
        ...address, // This should fill out everything that was included in the form
        id: this.userDetailsService.currentUser()?.address?.id ?? 0, // This should bring over the id
        postalCode: Number(address!.postalCode),
      } as Address,
      primaryPhone: {
        ...primaryPhone, // This should fill out everything that was included in the form
        id: this.userDetailsService.currentUser()?.primaryPhone?.id ?? 0,
        nationalDigits: '+1' + primaryPhone!.rawDigits,
      } as Phone,
      id: this.userDetailsService.currentUser()?.id ?? 0,
    });

    return this.createUserMutation
      .mutate({
        variables: {
          updatedUser: this.userDetailsService.currentUser() as User,
        },
      })
      .subscribe(({ errors }) => {
        return handleResponse(
          this.alertService,
          () => {
            this.alertService.addAlert(
              'success',
              'Successfully added user',
              2000
            );
            this.router.navigate(['settings/users/list']);
          },
          undefined,
          errors
        );
      });
  }
}
