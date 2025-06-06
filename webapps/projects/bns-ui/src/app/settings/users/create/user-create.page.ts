import { ButtonComponent } from '@/core/components/buttons';
import { CardComponent } from '@/core/components/card/card.component';
import { BreadcrumbsComponent } from '@/core/components/navigation/breadcrumbs';
import { Component, inject, signal } from '@angular/core';
import {
  AddressFormComponent,
  ContactFormComponent,
  InformationFormComponent,
} from '@/settings/users/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownOption } from '@/core/components';
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
          <app-breadcrumbs baseIcon="account_circle" [baseRoute]="[]">
            <div class="py-2 flex justify-end"></div>
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

  roles = signal<DropdownOption[]>([]);
  // TODO: Change this to use the new breadcrumb version
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
      // this.roles.set(roles);
    });
  }

  onBackClicked() {
    this.router.navigate(['settings', 'users', 'list']);
  }
}
