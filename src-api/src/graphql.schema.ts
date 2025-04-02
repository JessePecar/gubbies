
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum PermissionName {
    APPLICATION_LOGIN = "APPLICATION_LOGIN",
    INVENTORY = "INVENTORY",
    INVENTORY_ADJUSTMENTS = "INVENTORY_ADJUSTMENTS",
    INVENTORY_COUNTS = "INVENTORY_COUNTS",
    PRICING = "PRICING",
    PROMOTIONS = "PROMOTIONS",
    REPORTS = "REPORTS",
    REPORTS_INVENTORY = "REPORTS_INVENTORY",
    REPORTS_PRICING = "REPORTS_PRICING",
    REPORTS_PROMOTIONS = "REPORTS_PROMOTIONS",
    SETTINGS = "SETTINGS",
    EDIT_USER = "EDIT_USER",
    CREATE_USER = "CREATE_USER",
    EDIT_ROLE = "EDIT_ROLE",
    CREATE_ROLE = "CREATE_ROLE"
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

export class ReadRequest {
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    filters?: Nullable<FilterOption[]>;
    sort?: Nullable<SortOption[]>;
}

export class FilterOption {
    field?: Nullable<string>;
    value?: Nullable<SearchType>;
}

export class SortOption {
    field?: Nullable<string>;
    option?: Nullable<SortOption>;
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
    primaryPhone?: Nullable<UpdatePhoneInput>;
    address?: Nullable<UpdateAddressInput>;
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

export class UpdatePhoneInput {
    id: number;
    rawDigits: string;
    nationalDigits: string;
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
    abstract login(username?: Nullable<string>, password?: Nullable<string>): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;

    abstract items(request: ReadRequest): Nullable<Nullable<Item>[]> | Promise<Nullable<Nullable<Item>[]>>;

    abstract item(id: string): Nullable<Item> | Promise<Nullable<Item>>;

    abstract roles(): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;

    abstract role(id: number): Nullable<Role> | Promise<Nullable<Role>>;

    abstract roleTiers(): Nullable<Nullable<RoleTiers>[]> | Promise<Nullable<Nullable<RoleTiers>[]>>;

    abstract permissions(): Nullable<Nullable<Permission>[]> | Promise<Nullable<Nullable<Permission>[]>>;

    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class AuthResponse {
    accessToken: string;
    user: User;
}

export abstract class IMutation {
    abstract createItem(createItemInput?: Nullable<CreateItemInput>): Nullable<Item> | Promise<Nullable<Item>>;

    abstract upsertRole(upsertRoleInput?: Nullable<UpsertRoleInput>): Nullable<Role> | Promise<Nullable<Role>>;

    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUserInput?: Nullable<UpdateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract createRole(createRoleInput?: Nullable<CreateRoleInput>): Nullable<Role> | Promise<Nullable<Role>>;
}

export abstract class ISubscription {
    abstract itemCreated(): Nullable<Item> | Promise<Nullable<Item>>;

    abstract roleUpdated(): Nullable<Role> | Promise<Nullable<Role>>;

    abstract usersChanged(): Nullable<User> | Promise<Nullable<User>>;
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
}

export class AdjustmentItems {
    adjustmentId: number;
    itemId: number;
    adjustment?: Nullable<Adjustment>;
    item?: Nullable<Item>;
}

export class Category {
    code: string;
    name?: Nullable<string>;
    items?: Nullable<Nullable<Item>[]>;
    subCategories?: Nullable<Nullable<SubCategory>[]>;
}

export class SubCategory {
    code: string;
    categoryCode: string;
    name?: Nullable<string>;
    category: Category;
    items?: Nullable<Nullable<Item>[]>;
    families?: Nullable<Nullable<Family>[]>;
}

export class Family {
    code: string;
    name?: Nullable<string>;
    subCategoryCode: string;
    subCategory?: Nullable<SubCategory>;
    items?: Nullable<Nullable<Item>[]>;
}

export class Adjustment {
    id: number;
    createDate?: Nullable<string>;
    status: number;
    completeDate?: Nullable<string>;
    adjustmentItems?: Nullable<Nullable<AdjustmentItems>[]>;
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

export type SearchType = Int | String | Boolean;
type Nullable<T> = T | null;
