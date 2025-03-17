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
        <div
          class="even:bg-stone-900 odd:border-1 odd:border-stone-900 bg-stone-800 border-stone-800 mb-1 rounded">
          <role-item [role]="role" />
        </div>
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
    this.roleListService.getRoles().subscribe(res => {
      var {
        data: { roles },
      } = res;

      this.roles.set(roles);
    });
  }
}
