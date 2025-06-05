import { Subcategory } from '@/inventory/categories/interfaces';

export interface ICategory {
  name: string;
  code: string;
  canPromote: boolean;
  canTransfer: boolean;

  subcategories: Subcategory[];
}

export class Category {
  name: string;
  code: string;
  canPromote: boolean;
  canTransfer: boolean;

  subcategories: Subcategory[];

  constructor(category: ICategory) {
    this.name = category.name;
    this.code = category.name;
    this.canPromote = category.canPromote;
    this.canTransfer = category.canTransfer;
    this.subcategories = category.subcategories;
  }
}
