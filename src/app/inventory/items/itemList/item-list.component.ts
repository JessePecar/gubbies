import { Component, inject, signal } from '@angular/core';
import { ItemListService } from './item-list.service';
import { Item } from '../../models/items';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TableComponent } from '../../../components/tables/table.component';
import { ItemComponent } from './item.component';

@Component({
  selector: 'app-item-list',
  imports: [MatIconModule, ItemComponent, TableComponent],
  template: `
    <app-table [toolbarItems]="toolbarItems">
      @for (item of items(); track $index) {
        <item [item]="item" />
      }
    </app-table>
  `,
})
export class ItemListComponent {
  items = signal<Item[] | undefined>(undefined);
  router = inject(Router);

  constructor(service: ItemListService) {
    service.getItems().subscribe(res => {
      this.items.set(res);
    });
  }

  //TODO: Update to use user permissions
  toolbarItems = [
    { icon: 'add', text: 'Add Item', onClick: this.onCreateItem },
  ];

  async onCreateItem() {
    await this.router.navigate(['inventory/details']);
  }
}
