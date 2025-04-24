import { ShelfLocation } from "@/inventory/categories/interfaces/shelf-location.interface";

export interface Family {
  code: string;
  name: string;
  canPromoe: boolean;
  location: ShelfLocation;
}