import { User } from '@/interfaces/settings/users';
import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private readonly graphQLClient = inject(Apollo);
  private readonly formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({});

  getUser(id: number) {
    return this.graphQLClient.query<{ user: User }>({
      query: gql`
        query GetUsersById($id: ID!) {
          user(id: $id) {
            id
            firstName
            lastName
            userName
            isActive
            emailAddress
            primaryPhone {
              rawDigits
              nationalDigits
            }
            role {
              name
              id
            }
            address {
              address1
              address2
              city
              state
              countryCode
            }
          }
        }
      `,
      context: {
        uri: 'http://localhost:3000/graphql',
      },
      variables: {
        id: id,
      },
    });
  }

  updateUser(
    {
      id,
      firstName,
      lastName,
      userName,
      emailAddress,
      address1,
      address2,
      city,
      state,
      countryCode,
      postalCode,
      isActive,
      rawDigits,
    }: any,
    roleId: number, // TODO: Add dropdown to pass this from the form
    password: string // TODO: This will probably not change for a user, just leaving it in for now
  ) {
    return this.graphQLClient.mutate({
      mutation: gql`mutation UpdateUser(updateUserInput: UpdateUserInput) {
        updateUser(updateUserInput: $inputObject) {
          id
        }
      }`,
      variables: {
        inputObject: {
          id,
          firstName,
          lastName,
          userName,
          password,
          isActive,
          emailAddress,
          roleId,
          primaryPhone: {
            rawDigits: rawDigits,
          },
          address: {
            address1,
            address2,
            city,
            state,
            countryCode,
            postalCode,
          },
        },
      },
    });
  }

  populateForm(id: number) {
    this.form = this.sharedForm();
    this.getUser(id).subscribe(({ data: { user } }) => {
      this.form.get('firstName')?.setValue(user.firstName);
      this.form.get('lastName')?.setValue(user.lastName);
      this.form.get('userName')?.setValue(user.userName);
      this.form.get('emailAddress')?.setValue(user.emailAddress);
      this.form.get('isActive')?.setValue(user.isActive);
      this.form.get('address1')?.setValue(user.address?.address1);
      this.form.get('address2')?.setValue(user.address?.address2);
      this.form.get('city')?.setValue(user.address?.city);
      this.form.get('state')?.setValue(user.address?.state);
      this.form.get('countryCode')?.setValue(user.address?.countryCode);
      this.form.get('primaryPhone')?.setValue(user.primaryPhone?.rawDigits);
    });
  }

  sharedForm(): FormGroup {
    return this.formBuilder.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(3),
        ],
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(2),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(2),
        ],
      ],
      address1: [
        '',
        [
          Validators.required,
          Validators.maxLength(64),
          Validators.minLength(2),
        ],
      ],
      address2: ['', [Validators.nullValidator]],
      city: [
        '',
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(2),
        ],
      ],
      state: [
        '',
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.minLength(4),
        ],
      ],
      countryCode: [
        '',
        [Validators.required, Validators.maxLength(2), Validators.minLength(2)],
      ],
      postalCode: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      primaryPhone: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      emailAddress: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      isActive: [false],
    });
  }

  constructor() {}
}
