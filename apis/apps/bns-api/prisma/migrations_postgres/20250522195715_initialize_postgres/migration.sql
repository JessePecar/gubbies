-- CreateEnum
CREATE TYPE "ShelfSide" AS ENUM ('RIGHT', 'LEFT');

-- CreateTable
CREATE TABLE "AdjustmentItems" (
    "adjustmentId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "AdjustmentItems_pkey" PRIMARY KEY ("adjustmentId","itemId")
);

-- CreateTable
CREATE TABLE "Adjustments" (
    "id" SERIAL NOT NULL,
    "createDate" TIMESTAMP(3),
    "status" INTEGER NOT NULL,
    "completeDate" TIMESTAMP(3),

    CONSTRAINT "Adjustments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "code" TEXT NOT NULL,
    "name" TEXT,
    "canPromote" BOOLEAN NOT NULL DEFAULT false,
    "canTransfer" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "code" TEXT NOT NULL,
    "categoryCode" TEXT NOT NULL,
    "name" TEXT,
    "canPromote" BOOLEAN NOT NULL DEFAULT false,
    "canTransfer" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Family" (
    "code" TEXT NOT NULL,
    "subcategoryCode" TEXT NOT NULL,
    "name" TEXT,
    "locationId" INTEGER,
    "canPromote" BOOLEAN NOT NULL DEFAULT false,
    "canTransfer" BOOLEAN NOT NULL DEFAULT true,
    "canPriceChange" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "ShelfLocation" (
    "id" SERIAL NOT NULL,
    "aisle" INTEGER NOT NULL,
    "side" "ShelfSide" NOT NULL,
    "section" TEXT NOT NULL,

    CONSTRAINT "ShelfLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "primaryPhoneId" INTEGER,
    "secondaryPhoneId" INTEGER,
    "addressId" INTEGER,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemVendor" (
    "itemId" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "vendorItemId" TEXT NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "canReturn" BOOLEAN NOT NULL DEFAULT true,
    "isAutoReplenish" BOOLEAN NOT NULL DEFAULT true,
    "isPreferredVendor" BOOLEAN NOT NULL DEFAULT false,
    "canPromote" BOOLEAN NOT NULL DEFAULT false,
    "reorderQuantity" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "ItemVendor_pkey" PRIMARY KEY ("vendorId","itemId")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryCode" TEXT NOT NULL,
    "subcategoryCode" TEXT,
    "fieldCode" TEXT,
    "quantityOnHand" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "retirementStatus" INTEGER NOT NULL,
    "reorderQuantity" DECIMAL(65,30) NOT NULL,
    "unitOfMeasurementType" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceType" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PriceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "priceTypeId" INTEGER NOT NULL,
    "isTimedOverride" BOOLEAN,
    "expirationDate" TIMESTAMP(3),
    "isQuantityOverride" BOOLEAN,
    "expirationQuantity" INTEGER NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "permissionGroupId" INTEGER,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PermissionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hierarchyTier" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermissions" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "RolePermissions_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "SequelizeMeta" (
    "name" TEXT NOT NULL,

    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "roleId" INTEGER NOT NULL,
    "primaryPhoneId" INTEGER,
    "addressId" INTEGER,
    "userName" TEXT,
    "password" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "emailAddress" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "rawDigits" TEXT NOT NULL,
    "nationalDigits" TEXT NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "postalCode" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_addressId_key" ON "Users"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");

-- AddForeignKey
ALTER TABLE "AdjustmentItems" ADD CONSTRAINT "AdjustmentItems_adjustmentId_fkey" FOREIGN KEY ("adjustmentId") REFERENCES "Adjustments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdjustmentItems" ADD CONSTRAINT "AdjustmentItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "Categories"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_subcategoryCode_fkey" FOREIGN KEY ("subcategoryCode") REFERENCES "Subcategory"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "ShelfLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_primaryPhoneId_fkey" FOREIGN KEY ("primaryPhoneId") REFERENCES "Phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_secondaryPhoneId_fkey" FOREIGN KEY ("secondaryPhoneId") REFERENCES "Phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemVendor" ADD CONSTRAINT "ItemVendor_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemVendor" ADD CONSTRAINT "ItemVendor_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "Categories"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_subcategoryCode_fkey" FOREIGN KEY ("subcategoryCode") REFERENCES "Subcategory"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_fieldCode_fkey" FOREIGN KEY ("fieldCode") REFERENCES "Family"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_priceTypeId_fkey" FOREIGN KEY ("priceTypeId") REFERENCES "PriceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_permissionGroupId_fkey" FOREIGN KEY ("permissionGroupId") REFERENCES "PermissionGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermissions" ADD CONSTRAINT "RolePermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermissions" ADD CONSTRAINT "RolePermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_primaryPhoneId_fkey" FOREIGN KEY ("primaryPhoneId") REFERENCES "Phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
