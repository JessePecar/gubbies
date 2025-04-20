/*
  Warnings:

  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `subCategoryCode` on the `Family` table. All the data in the column will be lost.
  - You are about to drop the column `subCategoryCode` on the `Items` table. All the data in the column will be lost.
  - Added the required column `subcategoryCode` to the `Family` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SubCategory";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Subcategory" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "categoryCode" TEXT NOT NULL,
    "name" TEXT,
    CONSTRAINT "Subcategory_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "Categories" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Family" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "subcategoryCode" TEXT NOT NULL,
    "name" TEXT,
    CONSTRAINT "Family_subcategoryCode_fkey" FOREIGN KEY ("subcategoryCode") REFERENCES "Subcategory" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Family" ("code", "name") SELECT "code", "name" FROM "Family";
DROP TABLE "Family";
ALTER TABLE "new_Family" RENAME TO "Family";
CREATE TABLE "new_Items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryCode" TEXT NOT NULL,
    "subcategoryCode" TEXT,
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
    CONSTRAINT "Items_subcategoryCode_fkey" FOREIGN KEY ("subcategoryCode") REFERENCES "Subcategory" ("code") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Items_fieldCode_fkey" FOREIGN KEY ("fieldCode") REFERENCES "Family" ("code") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Items" ("basePrice", "categoryCode", "currentPrice", "fieldCode", "id", "isActive", "name", "quantityOnHand", "reorderQuantity", "retirementStatus", "unitOfMeasurementType", "vendorId") SELECT "basePrice", "categoryCode", "currentPrice", "fieldCode", "id", "isActive", "name", "quantityOnHand", "reorderQuantity", "retirementStatus", "unitOfMeasurementType", "vendorId" FROM "Items";
DROP TABLE "Items";
ALTER TABLE "new_Items" RENAME TO "Items";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
