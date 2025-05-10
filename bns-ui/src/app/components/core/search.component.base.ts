import { signal } from '@angular/core';

export class SearchComponentBase {
  protected searchText = signal<string | null>(null);

  protected onSearchChange(value: string | number | null) {
    if (value === null) {
      this.searchText.set(null);
      return;
    }

    this.searchText.set(value + '');
  }
}
