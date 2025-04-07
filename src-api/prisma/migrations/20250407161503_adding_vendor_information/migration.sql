/*
  Warnings:

  - Added the required column `vendorId` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Vendor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "primaryPhoneId" INTEGER,
    "secondaryPhoneId" INTEGER,
    "addressId" INTEGER,
    CONSTRAINT "Vendor_primaryPhoneId_fkey" FOREIGN KEY ("primaryPhoneId") REFERENCES "Phone" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Vendor_secondaryPhoneId_fkey" FOREIGN KEY ("secondaryPhoneId") REFERENCES "Phone" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Vendor_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemVendor" (
    "itemId" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "vendorItemId" TEXT NOT NULL,
    "cost" DECIMAL NOT NULL,
    "canReturn" BOOLEAN NOT NULL DEFAULT true,
    "isAutoReplenish" BOOLEAN NOT NULL DEFAULT true,
    "isPreferredVendor" BOOLEAN NOT NULL DEFAULT false,
    "canPromote" BOOLEAN NOT NULL DEFAULT false,
    "reorderQuantity" DECIMAL NOT NULL DEFAULT 0,

    PRIMARY KEY ("vendorId", "itemId"),
    CONSTRAINT "ItemVendor_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemVendor_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryCode" TEXT NOT NULL,
    "subCategoryCode" TEXT,
    "fieldCode" TEXT,
    "quantityOnHand" TEXT NOT NULL,
    "basePrice" DECIMAL NOT NULL,
    "currentPrice" DECIMAL NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "retirementStatus" INTEGER NOT NULL,
    "reorderQuantity" DECIMAL NOT NULL,
    "unitOfMeasurementType" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,
    CONSTRAINT "Items_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "Categories" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_subCategoryCode_fkey" FOREIGN KEY ("subCategoryCode") REFERENCES "SubCategory" ("code") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Items_fieldCode_fkey" FOREIGN KEY ("fieldCode") REFERENCES "Family" ("code") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Items" ("basePrice", "categoryCode", "currentPrice", "fieldCode", "id", "isActive", "name", "quantityOnHand", "reorderQuantity", "retirementStatus", "subCategoryCode", "unitOfMeasurementType") SELECT "basePrice", "categoryCode", "currentPrice", "fieldCode", "id", "isActive", "name", "quantityOnHand", "reorderQuantity", "retirementStatus", "subCategoryCode", "unitOfMeasurementType" FROM "Items";
DROP TABLE "Items";
ALTER TABLE "new_Items" RENAME TO "Items";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
