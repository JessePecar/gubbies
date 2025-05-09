import { Family } from '@/inventory/categories/interfaces/family.interface';

export interface ISubcategory {
  code: string;
  name: string;
  canPromote: boolean;
  canTransfer: boolean;
  families: Family[];
}

export class Subcategory {
  code: string;
  name: string;
  canPromote: boolean;
  canTransfer: boolean;
  families: Family[];

  constructor(subcategory: ISubcategory) {
    this.name = subcategory.name;
    this.code = subcategory.name;
    this.canPromote = subcategory.canPromote;
    this.canTransfer = subcategory.canTransfer;
    this.families = subcategory.families;
  }
}
