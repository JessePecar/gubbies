import { ShelfLocation } from '@/inventory/categories/interfaces/shelf-location.interface';

export interface Family {
  code: string;
  name: string;
  canPromote: boolean;
  canTransfer: boolean;
  canPriceChange: boolean;

  location: ShelfLocation;
}
