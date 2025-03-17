import { ButtonComponent } from '@/components';
import { Component, inject, input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoleDetailsService } from './role-details.service';
import { TextInputComponent } from '../../../components/text-input.component';

@Component({
  selector: 'app-role-details',
  imports: [ButtonComponent, ReactiveFormsModule, TextInputComponent],
  template: `
    <div class="flex flex-col w-full h-full justify-center items-center">
      <div class="flex w-1/2">
        <p style="font-size: 2rem" class="py-2">Add / Edit Role</p>
      </div>
      @if (form) {
        <form
          class="w-1/2 min-h-96 bg-stone-900 rounded shadow p-4"
          [formGroup]="form"
          (ngSubmit)="onSubmit()">
          <div>
            <app-text-input formControlName="name" />
            <!-- TODO: Change to a number input -->
            <app-text-input formControlName="hierarchyTier" />
          </div>
          <div class="flex justify-end space-x-4">
            <app-button
              (handleClick)="onCancel()"
              buttonType="outline"
              text="Cancel" />

            <app-button buttonType="raised" text="Submit"> </app-button>
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
  form: FormGroup | undefined;

  roleId = input<number | undefined>();

  ngOnInit(): void {
    this.roleDetailsService
      .getRole(this.roleId())
      ?.subscribe(({ data: { role } }) => {
        this.form = this.formBuilder.group({
          name: [
            role.name,
            [
              Validators.required,
              Validators.maxLength(32),
              Validators.minLength(3),
            ],
          ],
          hierarchyTier: [
            role.hierarchyTier,
            [Validators.required, Validators.min(0), Validators.max(100)],
          ],
        });
      });
  }

  onSubmit() {}

  onCancel() {}
}
