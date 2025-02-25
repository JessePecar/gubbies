import { Component } from '@angular/core';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { ButtonComponent } from "./components/button.component";

@Component({
    selector: 'app-root',
    imports: [NavigationComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gubbies';
}
