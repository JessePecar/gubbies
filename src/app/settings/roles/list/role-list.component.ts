import { Component, inject, OnInit } from '@angular/core';
import { RoleListService } from './role-list.service';

@Component({
  selector: 'app-role-list',
  imports: [],
  template: ` <p>role-list works!</p> `,
  styles: ``,
})
export class RoleListComponent implements OnInit {
  roleListService = inject(RoleListService);

  ngOnInit(): void {
    this.roleListService.getRoles();
  }
}
