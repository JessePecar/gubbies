import { Component } from '@angular/core';
import { TableComponent } from '../../../components/tables/table.component';

@Component({
  selector: 'app-users-list',
  imports: [TableComponent],
  template: ` <app-table> </app-table> `,
  styles: ``,
})
export class UsersListComponent {}
