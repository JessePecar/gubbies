
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
    CREATE_ROLE = "CREATE_ROLE",
    EDIT_ITEM = "EDIT_ITEM",
    CREATE_ITEM = "CREATE_ITEM",
    EDIT_VENDOR = "EDIT_VENDOR",
    CREATE_VENDOR = "CREATE_VENDOR",
    EDIT_CATEGORY = "EDIT_CATEGORY",
    CREATE_CATEGORY = "CREATE_CATEGORY"
}

export enum ShelfSide {
    RIGHT = "RIGHT",
    LEFT = "LEFT"
}

export interface ReadRequest {
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    filters?: Nullable<FilterOption[]>;
    sort?: Nullable<SortOption[]>;
}

export interface FilterOption {
    field: string;
    value: JSON;
}

export interface SortOption {
    field?: Nullable<string>;
    option?: Nullable<SortOption>;
}

export interface UpsertRoleInput {
    id?: Nullable<number>;
    name: string;
    hierarchyTier: number;
    rolePermissions?: Nullable<Nullable<RolePermissionInput>[]>;
}

export interface RolePermissionInput {
    permissionId: number;
}

export interface CreateRoleInput {
    name: string;
    rolePermissions?: Nullable<Nullable<CreateRolePermission>[]>;
}

export interface CreateRolePermission {
    permissionId: number;
}

export interface CreateUserInput {
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

export interface UpdateUserInput {
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

export interface CreatePhoneInput {
    rawDigits: string;
    nationalDigits: string;
}

export interface UpdatePhoneInput {
    id: number;
    rawDigits: string;
    nationalDigits: string;
}

export interface CreateAddressInput {
    address1: string;
    address2?: Nullable<string>;
    state: string;
    city: string;
    countryCode: string;
    postalCode: number;
}

export interface UpdateAddressInput {
    id: number;
    address1: string;
    address2?: Nullable<string>;
    state: string;
    city: string;
    countryCode: string;
    postalCode: number;
}

export interface CreateCategoryInput {
    code: string;
    name: string;
    canPromote?: Nullable<boolean>;
}

export interface CreateSubcategoryInput {
    code: string;
    name: string;
    canPromote?: Nullable<boolean>;
    categoryCode: string;
}

export interface CreateFamilyInput {
    code: string;
    name: string;
    canPromote?: Nullable<boolean>;
    subcategoryCode: string;
    location?: Nullable<CreateShelfLocation>;
}

export interface CreateShelfLocation {
    id: number;
    aisle: number;
    side: ShelfSide;
    section?: Nullable<string>;
}

export interface CreateItemInput {
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

export interface CreateVendorInput {
    name: string;
    notes: string;
    primaryPhone?: Nullable<CreatePhoneInput>;
    secondaryPhone?: Nullable<CreatePhoneInput>;
    address?: Nullable<CreateAddressInput>;
}

export interface UpdateVendorInput {
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

export interface CreateItemVendorInput {
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

export interface IQuery {
    login(username?: Nullable<string>, password?: Nullable<string>): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
    auth(token?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    roles(): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;
    role(id: number): Nullable<Role> | Promise<Nullable<Role>>;
    roleTiers(): Nullable<Nullable<RoleTiers>[]> | Promise<Nullable<Nullable<RoleTiers>[]>>;
    permissions(): Nullable<Nullable<Permission>[]> | Promise<Nullable<Nullable<Permission>[]>>;
    permissionGroups(): Nullable<Nullable<PermissionGroup>[]> | Promise<Nullable<Nullable<PermissionGroup>[]>>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    categories(): Nullable<Nullable<Category>[]> | Promise<Nullable<Nullable<Category>[]>>;
    category(code: string): Nullable<Category> | Promise<Nullable<Category>>;
    subcategories(categoryCode: string): Nullable<Nullable<Subcategory>[]> | Promise<Nullable<Nullable<Subcategory>[]>>;
    families(subcategoryCode: string): Nullable<Nullable<Family>[]> | Promise<Nullable<Nullable<Family>[]>>;
    items(request: ReadRequest): Nullable<Nullable<Item>[]> | Promise<Nullable<Nullable<Item>[]>>;
    item(id: string): Nullable<Item> | Promise<Nullable<Item>>;
    vendors(): Nullable<Nullable<Vendor>[]> | Promise<Nullable<Nullable<Vendor>[]>>;
    vendor(id: string): Nullable<Vendor> | Promise<Nullable<Vendor>>;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}

export interface IMutation {
    upsertRole(upsertRoleInput?: Nullable<UpsertRoleInput>): Nullable<Role> | Promise<Nullable<Role>>;
    createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;
    updateUser(updateUserInput?: Nullable<UpdateUserInput>): Nullable<User> | Promise<Nullable<User>>;
    createRole(createRoleInput?: Nullable<CreateRoleInput>): Nullable<Role> | Promise<Nullable<Role>>;
    upsertCategory(createCategoryInput?: Nullable<CreateCategoryInput>): Nullable<Category> | Promise<Nullable<Category>>;
    upsertSubcategory(createSubcategoryInput?: Nullable<CreateSubcategoryInput>): Nullable<Subcategory> | Promise<Nullable<Subcategory>>;
    upsertFamily(createFamilyInput?: Nullable<CreateFamilyInput>): Nullable<Family> | Promise<Nullable<Family>>;
    createItem(createItemInput?: Nullable<CreateItemInput>): Nullable<Item> | Promise<Nullable<Item>>;
    createVendor(createVendorInput?: Nullable<CreateVendorInput>): Nullable<Vendor> | Promise<Nullable<Vendor>>;
    updateVendor(updateVendorInput?: Nullable<UpdateVendorInput>): Nullable<Vendor> | Promise<Nullable<Vendor>>;
}

export interface ISubscription {
    roleUpdated(): Nullable<Role> | Promise<Nullable<Role>>;
    usersChanged(): Nullable<User> | Promise<Nullable<User>>;
    categoriesChanged(): Nullable<Category> | Promise<Nullable<Category>>;
    itemChanged(id: string): Nullable<Item> | Promise<Nullable<Item>>;
    itemsChanged(): Nullable<Item> | Promise<Nullable<Item>>;
}

export interface Role {
    id: number;
    name: string;
    hierarchyTier: number;
    rolePermissions?: Nullable<Nullable<RolePermission>[]>;
}

export interface RolePermission {
    roleId: number;
    permissionId: number;
    permission: Permission;
    role: Role;
}

export interface PermissionGroup {
    id: number;
    name: string;
    permissions?: Nullable<Nullable<Permission>[]>;
}

export interface Permission {
    id: number;
    name: PermissionName;
    rolePermissions?: Nullable<Nullable<RolePermission>[]>;
}

export interface RoleTiers {
    tierNumber: number;
}

export interface User {
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

export interface Phone {
    id: number;
    rawDigits?: Nullable<string>;
    nationalDigits?: Nullable<string>;
    users?: Nullable<Nullable<User>[]>;
}

export interface Address {
    id: number;
    address1: string;
    address2?: Nullable<string>;
    state: string;
    city: string;
    countryCode: string;
    postalCode: number;
    user?: Nullable<User>;
}

export interface Category {
    code: string;
    name?: Nullable<string>;
    items?: Nullable<Nullable<Item>[]>;
    subcategories?: Nullable<Nullable<Subcategory>[]>;
}

export interface Subcategory {
    code: string;
    categoryCode: string;
    name?: Nullable<string>;
    category: Category;
    items?: Nullable<Nullable<Item>[]>;
    families?: Nullable<Nullable<Family>[]>;
}

export interface Family {
    code: string;
    name?: Nullable<string>;
    subcategoryCode: string;
    location?: Nullable<ShelfLocation>;
    subcategory?: Nullable<Subcategory>;
    items?: Nullable<Nullable<Item>[]>;
}

export interface ShelfLocation {
    id: number;
    aisle?: Nullable<number>;
    side?: Nullable<ShelfSide>;
    section?: Nullable<string>;
}

export interface Item extends BaseItem {
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

export interface AdjustmentItems {
    adjustmentId: number;
    itemId: number;
    adjustment?: Nullable<Adjustment>;
    item?: Nullable<Item>;
}

export interface Adjustment {
    id: number;
    createDate?: Nullable<string>;
    status: number;
    completeDate?: Nullable<string>;
    adjustmentItems?: Nullable<Nullable<AdjustmentItems>[]>;
}

export interface Vendor {
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

export interface ItemVendor {
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
type Nullable<T> = T | null;
