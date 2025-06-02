export interface StoreCreateInput {
  name: string;
  typeCode: string;
  isDeleted: boolean;
  isActive: boolean;
  phoneId: number;
  addressId: number;
  chainId: number;
}

export interface Store {
  id: number;
  name: string;
  typeCode: string;
  isDeleted: boolean;
  isActive: boolean;
  phoneId: number;
  addressId: number;
  chainId: number;
}

export interface StoreUpdateInput extends Store {}
