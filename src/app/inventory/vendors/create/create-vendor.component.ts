import { CardModule } from '@/components/card';
import { Component, inject, signal } from '@angular/core';
import { VendorStoreService } from '@/inventory/vendors/store';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AddressFormComponent,
  InformationFormComponent,
  PhoneFormComponent,
} from '@/inventory/vendors/ui';
import {
  BreadcrumbOption,
  BreadcrumbsComponent,
} from '@/components/navigation/breadcrumbs.component';
import {
  CreateVendorService,
  VendorFormGroupNames,
} from './create-vendor.service';
import { ButtonComponent } from '../../../components/buttons/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-vendor',
  imports: [
    CardModule,
    ReactiveFormsModule,
    AddressFormComponent,
    InformationFormComponent,
    PhoneFormComponent,
    BreadcrumbsComponent,
    ButtonComponent,
  ],
  template: `
    <div class="h-full w-full">
      <div class="absolute pl-10 pt-4">
        <app-button
          buttonType="text"
          color="secondary"
          icon="chevron_left"
          (handleClick)="onBackClicked()"
          text="Vendor List" />
      </div>
      <app-breadcrumbs
        baseIcon="local_shipping"
        (onOptionClicked)="onOptionClicked($event)"
        [breadcrumbOptions]="activeOptions()"
        [selectedContent]="selectedOption()">
        <form [formGroup]="vendorStore.form">
          <card>
            <card-body>
              <div class="p-4">
                @switch (selectedOption()) {
                  @case ('info') {
                    <vendor-information-form />
                  }
                  @case ('address') {
                    <vendor-address-form />
                  }
                  @case ('phone') {
                    <vendor-phone-form />
                  }
                }
              </div>
            </card-body>
          </card>

          <div class="py-2 flex justify-end">
            @switch (selectedOption()) {
              @case ('phone') {
                <!-- Submit button -->
                <app-button
                  buttonType="raised"
                  [disabled]="!vendorStore.form.valid"
                  text="Submit"
                  (handleClick)="onSubmit()" />
              }
              @default {
                <!-- Next button -->
                <app-button
                  buttonType="raised"
                  text="Continue"
                  [disabled]="!vendorStore.form.get(selectedOption())?.valid"
                  (handleClick)="onMoveToNext()" />
              }
            }
          </div>
        </form>
      </app-breadcrumbs>
    </div>
  `,
  styles: ``,
})
export class CreateVendorComponent {
  vendorStore = inject(VendorStoreService);
  router = inject(Router);

  private readonly createVendorService = inject(CreateVendorService);

  defaultOptions: BreadcrumbOption<VendorFormGroupNames>[] = [
    { text: 'Vendor Information', id: 'info' },
    { text: 'Address', id: 'address' },
    { text: 'Contact Information', id: 'phone' },
  ];

  activeOptions = signal<BreadcrumbOption<VendorFormGroupNames>[]>([
    this.defaultOptions[0],
  ]);

  selectedOption = signal<VendorFormGroupNames>(this.defaultOptions[0].id);

  onOptionClicked(id: string | number) {
    var index = this.defaultOptions.findIndex(opt => opt.id === id);

    this.setActiveOptions(index);
  }

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

  onSubmit() {
    const vendorFormValue = this.vendorStore.form.value;

    this.createVendorService.onCreate(vendorFormValue);
  }

  onMoveToNext() {
    // If there are more options to add, then add the active option
    if (this.activeOptions().length < this.defaultOptions.length) {
      this.setActiveOptions(this.activeOptions().length);
    }
  }

  onBackClicked() {
    this.router.navigate(['inventory', 'vendors', 'list']);
  }
}
