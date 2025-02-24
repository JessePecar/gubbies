import { Component } from '@angular/core';
import { TextInputComponent } from "../components/text-input.component";
import { ButtonComponent } from "../components/button.component";
import { MatCardModule} from '@angular/material/card'

@Component({
    selector: 'app-login',
    imports: [TextInputComponent, ButtonComponent, MatCardModule],
    template: `
    <div class="flex flex-col justify-center items-center h-full">
      <mat-card appearance="raised">
        <mat-card-header>
          <h1 class="logo text-[6rem] italic text-gray-100 font-bold mb-4">Gubbens</h1>
        </mat-card-header>
        <mat-card-content>
          <div class="w-full flex flex-col justify-between items-center p-4">
            <div class="flex flex-col">
              <app-text-input [required]="true" placeholder="User Name" />
              <app-text-input [required]="true" placeholder="Password" />
            </div>
          </div>
        </mat-card-content>
        <mat-card-footer>
          <div class="flex justify-end p-4">
            <app-button buttonType="flat" text="Submit" (onClick)="onSubmit()" />
          </div>
        </mat-card-footer>
      </mat-card>
    </div>
  `,
    styles: `
    .logo {
      font-family: 'helvetica'
    }
  `
})
  
export class LoginComponent {

  onSubmit() {}

}
