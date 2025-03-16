import { Component, inject, OnInit, signal } from '@angular/core';
import { RoleListService } from './role-list.service';
import { TableComponent } from '@/components/tables/table.component';
import { Role } from '@/interfaces/settings/roles';
import { RoleItemComponent } from './role-item.component';

@Component({
  selector: 'app-role-list',
  imports: [TableComponent, RoleItemComponent],
  template: `<app-table [toolbarItems]="toolbarItems">
    @if (roles().length > 0) {
      @for (role of roles(); track $index) {
        <role-item [role]="role" />
      }
    } @else {
      <div class="flex w-full justify-center items-cetner">
        <p>No users found.</p>
      </div>
    }
  </app-table>`,
  styles: ``,
})
export class RoleListComponent implements OnInit {
  roleListService = inject(RoleListService);
  roles = signal<Role[]>([]);

  toolbarItems = [
    {
      icon: 'add',
      text: 'Add Role',
      onClick: () => {},
    },
  ];

  ngOnInit(): void {
    this.roleListService.getRoles();
  }
}
