import { CreateItemMutation } from '@/bns-ui/inventory/items/requests';
import { handleResponse } from '@/bns-ui/utilities';
import { GlobalAlertService } from '@/core/components/alert';
import { ItemStore } from '@/inventory/items/store';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemCreateService {
  itemStore = inject(ItemStore);
  createItemService = inject(CreateItemMutation);
  globalAlertService = inject(GlobalAlertService);

  constructor() {}

  createItem(item: any) {
    this.createItemService.mutate(item).subscribe(({ errors }) => {
      handleResponse(
        this.globalAlertService,
        () => this.globalAlertService.addAlert('success', 'Item was created sucessfully', 2000),
        undefined,
        errors
      );
    });
  }
}
