import { ButtonComponent } from '@/components/buttons';
import { CardComponent } from '@/components/card/card.component';
import {
  BreadcrumbOption,
  BreadcrumbsComponent,
} from '@/components/navigation/breadcrumbs.component';
import { Component, inject, signal } from '@angular/core';
import { UserFormGroupNames } from '@/settings/users/details';
import {
  AddressFormComponent,
  ContactFormComponent,
  InformationFormComponent,
} from '@/settings/users/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownOption } from '@/components';
import { UserCreateService } from './user-create.service';
import { UserStore } from '@/settings/users/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [
    ButtonComponent,
    CardComponent,
    BreadcrumbsComponent,
    InformationFormComponent,
    AddressFormComponent,
    ContactFormComponent,
    ReactiveFormsModule,
  ],
  template: `
    <div class="h-full overflow-hidden">
      <div class="absolute pt-4">
        <app-button
          buttonType="text"
          color="primary"
          icon="chevron_left"
          (handleClick)="onBackClicked()"
          text="Users List" />
      </div>
      @if (userStore.form; as form) {
        <form class="h-full" [formGroup]="form" (ngSubmit)="onSubmit()">
          <app-breadcrumbs
            baseIcon="account_circle"
            (onOptionClicked)="onOptionClicked($event)"
            [breadcrumbOptions]="activeOptions()"
            [selectedContent]="selectedOption()">
            @switch (selectedOption()) {
              <!-- The user information form that will hold the their name and role -->
              @case ('info') {
                <card>
                  <div class="p-4">
                    <information-form [isCreate]="true" [roles]="roles()" />
                  </div>
                </card>
              }
              @case ('address') {
                <!-- The user address form that will hold their address info -->
                <card>
                  <div class="p-4">
                    <address-form />
                  </div>
                </card>
              }
              <!-- The user contact information that will hold their phone(s) -->
              @case ('primaryPhone') {
                <card>
                  <div class="p-4">
                    <contact-form />
                  </div>
                </card>
              }
            }

            <div class="py-2 flex justify-end">
              @switch (selectedOption()) {
                @case ('primaryPhone') {
                  <!-- Submit button -->
                  <app-button
                    buttonType="raised"
                    [disabled]="!form.valid"
                    text="Submit"
                    (handleClick)="onSubmit()" />
                }
                @default {
                  <!-- Next button -->
                  <app-button
                    buttonType="raised"
                    text="Continue"
                    [disabled]="!form.get(selectedOption())?.valid"
                    (handleClick)="onMoveToNext()" />
                }
              }
            </div>
          </app-breadcrumbs>
        </form>
      }
    </div>
  `,
  styles: ``,
})
export class UserCreatePage {
  private readonly userCreateService = inject(UserCreateService);
  private readonly router = inject(Router);
  userStore = inject(UserStore);

  defaultOptions: BreadcrumbOption<UserFormGroupNames>[] = [
    { text: 'User Information', id: 'info' },
    { text: 'Address', id: 'address' },
    { text: 'Phone', id: 'primaryPhone' },
  ];

  activeOptions = signal<BreadcrumbOption<UserFormGroupNames>[]>([
    this.defaultOptions[0],
  ]);

  selectedOption = signal<UserFormGroupNames>(this.defaultOptions[0].id);

  roles = signal<DropdownOption[]>([]);

  onOptionClicked(id: string | number) {
    const index = this.defaultOptions.findIndex(opt => opt.id === id);

    this.setActiveOptions(index);
  }

  onMoveToNext() {
    // If there are more options to add, then add the active option
    if (this.activeOptions().length < this.defaultOptions.length) {
      this.setActiveOptions(this.activeOptions().length);
    }
  }

  // Set the active options based on the index given
  setActiveOptions(index: number) {
    // If id doesn't exist, we will just reset to the beginning
    if (index === -1) {
      this.activeOptions.set([this.defaultOptions[0]]);
    } else {
      // Set the active options to the default options that have a lesser or equal index
      this.activeOptions.set(
        this.defaultOptions.filter((_, idx) => idx <= index)
      );
    }

    // Grab the last item in the list
    this.selectedOption.set(
      this.activeOptions()[this.activeOptions().length - 1].id
    );
  }

  // Submit the user to the database
  onSubmit() {
    if (this.userStore.form !== undefined && this.userStore.form.valid) {
      const createObject = this.userStore.schemaToCreateObject(
        this.userStore.form.value
      );

      this.userCreateService.createUser(createObject);
    }
  }

  constructor() {
    // Populate the form object with a blank user

    // Get available roles
    this.userStore.getRolesForDropdown().subscribe(({ data: { roles } }) => {
      this.roles.set(roles);
    });
  }

  onBackClicked() {
    this.router.navigate(['settings', 'users', 'list']);
  }
}
