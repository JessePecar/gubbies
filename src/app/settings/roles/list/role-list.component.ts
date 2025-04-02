import { Component, inject, OnInit } from '@angular/core';
import { RoleListService } from './role-list.service';
import { TableComponent } from '@/components/tables/table.component';
import { RoleItemComponent } from './role-item.component';
import { UserInfoService } from '@/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-list',
  imports: [TableComponent, RoleItemComponent],
  template: `<app-table [toolbarItems]="toolbarItems">
    <div class="h-full overflow-y-auto">
      @if (roleListService.roles(); as roles) {
        @for (tier of roles; track tier.tierId) {
          <div class="mb-1 px-1">
            <div
              class="p-4 w-full border-b border-stone-900 shadow-b bg-stone-400 text-stone-900 rounded-t">
              <p class="text-lg">Tier {{ tier.tierId }}</p>
            </div>
            <div class="shadow-inset px-4 py-1">
              @for (role of tier.roles; track $index) {
                <div
                  class="even:bg-stone-900 odd:border-1 odd:border-stone-900 bg-stone-800 border-stone-800 mb-1 rounded">
                  <role-item [role]="role" />
                </div>
              }
            </div>
          </div>
        } @empty {
          <div class="flex w-full justify-center items-cetner">
            <p>No roles found.</p>
          </div>
        }
      }
    </div>
  </app-table>`,
  styles: ``,
})
export class RoleListComponent implements OnInit {
  roleListService = inject(RoleListService);
  userInfoService = inject(UserInfoService);
  router = inject(Router);

  toolbarItems: { icon: string; text: string; onClick: () => void }[] = [];

  constructor() {}

  ngOnInit(): void {
    if (
      this.userInfoService
        .userInfo()
        ?.role.rolePermissions.find(rp => rp.permissionId === 15)
    ) {
      this.toolbarItems.push({
        icon: 'add',
        text: 'Add Role',
        onClick: () => this.onCreateRole(),
      });
    }
  }

  onCreateRole() {
    this.router.navigate(['settings/roles/details']);
  }
}
