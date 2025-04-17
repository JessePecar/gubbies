/*
  Warnings:

  - You are about to alter the column `status` on the `Adjustments` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("number")` to `Int`.
  - You are about to alter the column `currentPrice` on the `Items` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.
  - Made the column `status` on table `Adjustments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentPrice` on table `Items` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Phone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rawDigits" TEXT NOT NULL,
    "nationalDigits" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdjustmentItems" (
    "adjustmentId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    PRIMARY KEY ("adjustmentId", "itemId"),
    CONSTRAINT "AdjustmentItems_adjustmentId_fkey" FOREIGN KEY ("adjustmentId") REFERENCES "Adjustments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AdjustmentItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AdjustmentItems" ("adjustmentId", "itemId") SELECT "adjustmentId", "itemId" FROM "AdjustmentItems";
DROP TABLE "AdjustmentItems";
ALTER TABLE "new_AdjustmentItems" RENAME TO "AdjustmentItems";
CREATE TABLE "new_Adjustments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createDate" DATETIME,
    "status" INTEGER NOT NULL,
    "completeDate" DATETIME
);
INSERT INTO "new_Adjustments" ("completeDate", "createDate", "id", "status") SELECT "completeDate", "createDate", "id", "status" FROM "Adjustments";
DROP TABLE "Adjustments";
ALTER TABLE "new_Adjustments" RENAME TO "Adjustments";
CREATE TABLE "new_Items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryCode" TEXT NOT NULL,
    "quantityOnHand" TEXT NOT NULL,
    "basePrice" DECIMAL NOT NULL,
    "currentPrice" DECIMAL NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "retirementStatus" INTEGER NOT NULL,
    "reorderQuantity" DECIMAL NOT NULL,
    "unitOfMeasurementType" INTEGER NOT NULL,
    CONSTRAINT "Items_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "Categories" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Items" ("basePrice", "categoryCode", "currentPrice", "id", "isActive", "name", "quantityOnHand", "reorderQuantity", "retirementStatus", "unitOfMeasurementType") SELECT "basePrice", "categoryCode", "currentPrice", "id", "isActive", "name", "quantityOnHand", "reorderQuantity", "retirementStatus", "unitOfMeasurementType" FROM "Items";
DROP TABLE "Items";
ALTER TABLE "new_Items" RENAME TO "Items";
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT,
    "lastName" TEXT,
    "roleId" INTEGER NOT NULL,
    "primaryPhoneId" INTEGER,
    "addressId" INTEGER,
    "userName" TEXT,
    "password" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "emailAddress" TEXT,
    CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Users_primaryPhoneId_fkey" FOREIGN KEY ("primaryPhoneId") REFERENCES "Phone" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("firstName", "id", "lastName", "password", "roleId", "userName") SELECT "firstName", "id", "lastName", "password", "roleId", "userName" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_addressId_key" ON "Users"("addressId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");
