import { Component, inject, input, OnInit, signal } from '@angular/core';
import { UserDetailsService } from './user-details.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '@/interfaces/settings/users';
import { TextInputComponent } from '../../../components/text-input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-details',
  imports: [TextInputComponent, ReactiveFormsModule],
  template: `
    <div class="flex flex-col w-full h-full justify-center items-center">
      <div class="flex w-1/2">
        <p class="text-lg py-2">Add / Edit User</p>
      </div>
      @if (form !== undefined) {
        <form
          class="w-1/2 min-h-96 bg-stone-900 rounded shadow p-4"
          [formGroup]="form"
          (ngSubmit)="onSubmit()">
          <div class="grid grid-cols-4 gap-2">
            <app-text-input formControlName="firstName" label="First Name" />
            <app-text-input formControlName="lastName" label="Last Name" />
            <app-text-input formControlName="userName" label="User Name" />
          </div>
        </form>
      }
    </div>
  `,
})
export class UserDetailsComponent implements OnInit {
  userDetailService = inject(UserDetailsService);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

  userId = input<number | undefined>();

  currentUser = signal<User | undefined>(undefined);

  form?: FormGroup;

  ngOnInit(): void {
    if (this.userId() !== undefined) {
      this.userDetailService
        .getUser(this.userId() as number)
        .subscribe(({ data: { user } }) => {
          this.currentUser.set(user);
          this.buildForm();
        });
    } else {
      this.buildForm();
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      userName: [
        this.currentUser()?.userName,
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(3),
        ],
      ],
      firstName: [
        this.currentUser()?.firstName,
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(2),
        ],
      ],
      lastName: [
        this.currentUser()?.lastName,
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(2),
        ],
      ],
    });
  }

  onSubmit() {}
}
