import { ShelfLocation } from '@/inventory/categories/interfaces';
import { Subcategory } from '@/inventory/categories/interfaces';

export interface Family {
  code: string;
  name: string;
  canPromote: boolean;
  canTransfer: boolean;
  canPriceChange: boolean;

  subcategory: Subcategory;
  location: ShelfLocation;
}
