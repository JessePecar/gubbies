import { Category } from '@/inventory/categories/interfaces/category.interface';
import { Family } from '@/inventory/categories/interfaces/family.interface';

export interface ISubcategory {
  code: string;
  name: string;
  canPromote: boolean;
  canTransfer: boolean;
  families: Family[];
  category: Category;
}

export class Subcategory {
  code: string;
  name: string;
  canPromote: boolean;
  canTransfer: boolean;
  families: Family[];
  category: Category;

  constructor(subcategory: ISubcategory) {
    this.name = subcategory.name;
    this.code = subcategory.name;
    this.canPromote = subcategory.canPromote;
    this.canTransfer = subcategory.canTransfer;
    this.families = subcategory.families;
    this.category = subcategory.category;
  }
}
