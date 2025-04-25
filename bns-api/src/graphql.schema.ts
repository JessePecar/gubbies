/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum PermissionName {
  APPLICATION_LOGIN = 'APPLICATION_LOGIN',
  INVENTORY = 'INVENTORY',
  INVENTORY_ADJUSTMENTS = 'INVENTORY_ADJUSTMENTS',
  INVENTORY_COUNTS = 'INVENTORY_COUNTS',
  PRICING = 'PRICING',
  PROMOTIONS = 'PROMOTIONS',
  REPORTS = 'REPORTS',
  REPORTS_INVENTORY = 'REPORTS_INVENTORY',
  REPORTS_PRICING = 'REPORTS_PRICING',
  REPORTS_PROMOTIONS = 'REPORTS_PROMOTIONS',
  SETTINGS = 'SETTINGS',
  EDIT_USER = 'EDIT_USER',
  CREATE_USER = 'CREATE_USER',
  EDIT_ROLE = 'EDIT_ROLE',
  CREATE_ROLE = 'CREATE_ROLE',
  EDIT_ITEM = 'EDIT_ITEM',
  CREATE_ITEM = 'CREATE_ITEM',
  EDIT_VENDOR = 'EDIT_VENDOR',
  CREATE_VENDOR = 'CREATE_VENDOR',
  EDIT_CATEGORY = 'EDIT_CATEGORY',
  CREATE_CATEGORY = 'CREATE_CATEGORY',
}

export enum ShelfSide {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export class ReadRequest {
  limit?: Nullable<number>;
  offset?: Nullable<number>;
  filters?: Nullable<FilterOption[]>;
  sort?: Nullable<SortOption[]>;
}

export class FilterOption {
  field: string;
  value: JSON;
}

export class SortOption {
  field?: Nullable<string>;
  option?: Nullable<SortOption>;
}

export class UpsertRoleInput {
  id?: Nullable<number>;
  name: string;
  hierarchyTier: number;
  rolePermissions?: Nullable<Nullable<RolePermissionInput>[]>;
}

export class RolePermissionInput {
  permissionId: number;
}

export class CreateRoleInput {
  name: string;
  rolePermissions?: Nullable<Nullable<CreateRolePermission>[]>;
}

export class CreateRolePermission {
  permissionId: number;
}

export class CreateUserInput {
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  roleId: number;
  userName: string;
  isActive?: Nullable<boolean>;
  emailAddress?: Nullable<string>;
  primaryPhone?: Nullable<CreatePhoneInput>;
  address?: Nullable<CreateAddressInput>;
  password?: Nullable<string>;
}

export class UpdateUserInput {
  id: number;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  roleId: number;
  userName: string;
  isActive?: Nullable<boolean>;
  emailAddress?: Nullable<string>;
  primaryPhoneId?: Nullable<number>;
  primaryPhone?: Nullable<UpdatePhoneInput>;
  addressId?: Nullable<number>;
  address?: Nullable<UpdateAddressInput>;
}

export class CreatePhoneInput {
  rawDigits: string;
  nationalDigits: string;
}

export class UpdatePhoneInput {
  id: number;
  rawDigits: string;
  nationalDigits: string;
}

export class CreateAddressInput {
  address1: string;
  address2?: Nullable<string>;
  state: string;
  city: string;
  countryCode: string;
  postalCode: number;
}

export class UpdateAddressInput {
  id: number;
  address1: string;
  address2?: Nullable<string>;
  state: string;
  city: string;
  countryCode: string;
  postalCode: number;
}

export class CreateCategoryInput {
  code: string;
  name: string;
  canPromote?: Nullable<boolean>;
}

export class CreateSubcategoryInput {
  code: string;
  name: string;
  canPromote?: Nullable<boolean>;
  categoryCode: string;
}

export class CreateFamilyInput {
  code: string;
  name: string;
  canPromote?: Nullable<boolean>;
  subcategoryCode: string;
  location?: Nullable<CreateShelfLocation>;
}

export class CreateShelfLocation {
  id: number;
  aisle: number;
  side: ShelfSide;
  section?: Nullable<string>;
}

export class CreateItemInput {
  id: number;
  name: string;
  categoryCode: string;
  quantityOnHand?: Nullable<string>;
  basePrice: number;
  currentPrice?: Nullable<number>;
  isActive: boolean;
  retirementStatus: number;
  reorderQuantity?: Nullable<number>;
  unitOfMeasurementType: number;
  vendors?: Nullable<Nullable<CreateItemVendorInput>[]>;
}

export class CreateVendorInput {
  name: string;
  notes: string;
  primaryPhone?: Nullable<CreatePhoneInput>;
  secondaryPhone?: Nullable<CreatePhoneInput>;
  address?: Nullable<CreateAddressInput>;
}

export class UpdateVendorInput {
  id: string;
  name: string;
  notes: string;
  primaryPhoneId?: Nullable<number>;
  secondaryPhoneId?: Nullable<number>;
  addressId?: Nullable<number>;
  primaryPhone?: Nullable<UpdatePhoneInput>;
  secondaryPhone?: Nullable<UpdatePhoneInput>;
  address?: Nullable<UpdateAddressInput>;
}

export class CreateItemVendorInput {
  vendorId: string;
  vendorItemId?: Nullable<string>;
  cost?: Nullable<number>;
  canReturn?: Nullable<boolean>;
  isAutoReplenish?: Nullable<boolean>;
  isPreferredVendor?: Nullable<boolean>;
  canPromote?: Nullable<boolean>;
  reorderQuantity?: Nullable<number>;
}

export interface BaseItem {
  id: number;
  name: string;
  categoryCode: string;
  quantityOnHand?: Nullable<string>;
  basePrice: number;
  currentPrice?: Nullable<number>;
  isActive: boolean;
  retirementStatus: number;
  reorderQuantity?: Nullable<number>;
  unitOfMeasurementType: number;
}

export abstract class IQuery {
  abstract login(
    username?: Nullable<string>,
    password?: Nullable<string>,
  ): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;

  abstract auth(
    token?: Nullable<string>,
  ): Nullable<User> | Promise<Nullable<User>>;

  abstract roles():
    | Nullable<Nullable<Role>[]>
    | Promise<Nullable<Nullable<Role>[]>>;

  abstract role(id: number): Nullable<Role> | Promise<Nullable<Role>>;

  abstract roleTiers():
    | Nullable<Nullable<RoleTiers>[]>
    | Promise<Nullable<Nullable<RoleTiers>[]>>;

  abstract permissions():
    | Nullable<Nullable<Permission>[]>
    | Promise<Nullable<Nullable<Permission>[]>>;

  abstract permissionGroups():
    | Nullable<Nullable<PermissionGroup>[]>
    | Promise<Nullable<Nullable<PermissionGroup>[]>>;

  abstract users():
    | Nullable<Nullable<User>[]>
    | Promise<Nullable<Nullable<User>[]>>;

  abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

  abstract categories():
    | Nullable<Nullable<Category>[]>
    | Promise<Nullable<Nullable<Category>[]>>;

  abstract category(
    code: string,
  ): Nullable<Category> | Promise<Nullable<Category>>;

  abstract subcategories(
    categoryCode: string,
  ):
    | Nullable<Nullable<Subcategory>[]>
    | Promise<Nullable<Nullable<Subcategory>[]>>;

  abstract families(
    subcategoryCode: string,
  ): Nullable<Nullable<Family>[]> | Promise<Nullable<Nullable<Family>[]>>;

  abstract items(
    request: ReadRequest,
  ): Nullable<Nullable<Item>[]> | Promise<Nullable<Nullable<Item>[]>>;

  abstract item(id: string): Nullable<Item> | Promise<Nullable<Item>>;

  abstract vendors():
    | Nullable<Nullable<Vendor>[]>
    | Promise<Nullable<Nullable<Vendor>[]>>;

  abstract vendor(id: string): Nullable<Vendor> | Promise<Nullable<Vendor>>;
}

export class AuthResponse {
  accessToken: string;
  user: User;
}

export abstract class IMutation {
  abstract upsertRole(
    upsertRoleInput?: Nullable<UpsertRoleInput>,
  ): Nullable<Role> | Promise<Nullable<Role>>;

  abstract createUser(
    createUserInput?: Nullable<CreateUserInput>,
  ): Nullable<User> | Promise<Nullable<User>>;

  abstract updateUser(
    updateUserInput?: Nullable<UpdateUserInput>,
  ): Nullable<User> | Promise<Nullable<User>>;

  abstract createRole(
    createRoleInput?: Nullable<CreateRoleInput>,
  ): Nullable<Role> | Promise<Nullable<Role>>;

  abstract upsertCategory(
    createCategoryInput?: Nullable<CreateCategoryInput>,
  ): Nullable<Category> | Promise<Nullable<Category>>;

  abstract upsertSubcategory(
    createSubcategoryInput?: Nullable<CreateSubcategoryInput>,
  ): Nullable<Subcategory> | Promise<Nullable<Subcategory>>;

  abstract upsertFamily(
    createFamilyInput?: Nullable<CreateFamilyInput>,
  ): Nullable<Family> | Promise<Nullable<Family>>;

  abstract createItem(
    createItemInput?: Nullable<CreateItemInput>,
  ): Nullable<Item> | Promise<Nullable<Item>>;

  abstract createVendor(
    createVendorInput?: Nullable<CreateVendorInput>,
  ): Nullable<Vendor> | Promise<Nullable<Vendor>>;

  abstract updateVendor(
    updateVendorInput?: Nullable<UpdateVendorInput>,
  ): Nullable<Vendor> | Promise<Nullable<Vendor>>;
}

export abstract class ISubscription {
  abstract roleUpdated(): Nullable<Role> | Promise<Nullable<Role>>;

  abstract usersChanged(): Nullable<User> | Promise<Nullable<User>>;

  abstract categoriesChanged():
    | Nullable<Category>
    | Promise<Nullable<Category>>;

  abstract itemChanged(id: string): Nullable<Item> | Promise<Nullable<Item>>;

  abstract itemsChanged(): Nullable<Item> | Promise<Nullable<Item>>;
}

export class Role {
  id: number;
  name: string;
  hierarchyTier: number;
  rolePermissions?: Nullable<Nullable<RolePermission>[]>;
}

export class RolePermission {
  roleId: number;
  permissionId: number;
  permission: Permission;
  role: Role;
}

export class PermissionGroup {
  id: number;
  name: string;
  permissions?: Nullable<Nullable<Permission>[]>;
}

export class Permission {
  id: number;
  name: PermissionName;
  rolePermissions?: Nullable<Nullable<RolePermission>[]>;
}

export class RoleTiers {
  tierNumber: number;
}

export class User {
  id: number;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  roleId: number;
  primaryPhoneId?: Nullable<number>;
  addressId?: Nullable<number>;
  userName: string;
  isActive?: Nullable<boolean>;
  emailAddress?: Nullable<string>;
  role: Role;
  primaryPhone?: Nullable<Phone>;
  address?: Nullable<Address>;
}

export class Phone {
  id: number;
  rawDigits?: Nullable<string>;
  nationalDigits?: Nullable<string>;
  users?: Nullable<Nullable<User>[]>;
}

export class Address {
  id: number;
  address1: string;
  address2?: Nullable<string>;
  state: string;
  city: string;
  countryCode: string;
  postalCode: number;
  user?: Nullable<User>;
}

export class Category {
  code: string;
  name?: Nullable<string>;
  canPromote?: Nullable<boolean>;
  items?: Nullable<Nullable<Item>[]>;
  subcategories?: Nullable<Nullable<Subcategory>[]>;
}

export class Subcategory {
  code: string;
  categoryCode: string;
  name?: Nullable<string>;
  canPromote?: Nullable<boolean>;
  category: Category;
  items?: Nullable<Nullable<Item>[]>;
  families?: Nullable<Nullable<Family>[]>;
}

export class Family {
  code: string;
  name?: Nullable<string>;
  subcategoryCode: string;
  canPromote?: Nullable<boolean>;
  location?: Nullable<ShelfLocation>;
  subcategory?: Nullable<Subcategory>;
  items?: Nullable<Nullable<Item>[]>;
}

export class ShelfLocation {
  id: number;
  aisle?: Nullable<number>;
  side?: Nullable<ShelfSide>;
  section?: Nullable<string>;
}

export class Item implements BaseItem {
  id: number;
  name: string;
  categoryCode: string;
  quantityOnHand?: Nullable<string>;
  basePrice: number;
  currentPrice?: Nullable<number>;
  isActive: boolean;
  retirementStatus: number;
  reorderQuantity?: Nullable<number>;
  unitOfMeasurementType: number;
  adjustmentItems?: Nullable<Nullable<AdjustmentItems>[]>;
  category?: Nullable<Category>;
  subcategory?: Nullable<Subcategory>;
  family?: Nullable<Family>;
}

export class AdjustmentItems {
  adjustmentId: number;
  itemId: number;
  adjustment?: Nullable<Adjustment>;
  item?: Nullable<Item>;
}

export class Adjustment {
  id: number;
  createDate?: Nullable<string>;
  status: number;
  completeDate?: Nullable<string>;
  adjustmentItems?: Nullable<Nullable<AdjustmentItems>[]>;
}

export class Vendor {
  id: number;
  name?: Nullable<string>;
  notes?: Nullable<string>;
  primaryPhoneId?: Nullable<number>;
  secondaryPhoneId?: Nullable<number>;
  addressId?: Nullable<number>;
  primaryPhone?: Nullable<Phone>;
  secondaryPhone?: Nullable<Phone>;
  address?: Nullable<Address>;
}

export class ItemVendor {
  itemId: string;
  vendorId: string;
  vendorItemId?: Nullable<string>;
  cost?: Nullable<number>;
  canReturn?: Nullable<boolean>;
  isAutoReplenish?: Nullable<boolean>;
  isPreferredVendor?: Nullable<boolean>;
  canPromote?: Nullable<boolean>;
  reorderQuantity?: Nullable<number>;
  vendor: Vendor;
  item: Item;
}

export type JSON = any;
type Nullable<T> = T | undefined;
