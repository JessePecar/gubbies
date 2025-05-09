import { ShelfLocation } from '@/inventory/categories/interfaces/shelf-location.interface';
import { Subcategory } from '@/inventory/categories/interfaces/subcategory.interface';

export interface Family {
  code: string;
  name: string;
  canPromote: boolean;
  canTransfer: boolean;
  canPriceChange: boolean;

  subcategory: Subcategory;
  location: ShelfLocation;
}
