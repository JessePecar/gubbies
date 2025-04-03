-- CreateTable
CREATE TABLE "SubCategory" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "categoryCode" TEXT NOT NULL,
    "name" TEXT,
    CONSTRAINT "SubCategory_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "Categories" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Family" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "subCategoryCode" TEXT NOT NULL,
    "name" TEXT,
    CONSTRAINT "Family_subCategoryCode_fkey" FOREIGN KEY ("subCategoryCode") REFERENCES "SubCategory" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
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
    CONSTRAINT "Items_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "Categories" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_subCategoryCode_fkey" FOREIGN KEY ("subCategoryCode") REFERENCES "SubCategory" ("code") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Items_fieldCode_fkey" FOREIGN KEY ("fieldCode") REFERENCES "Family" ("code") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Items" ("basePrice", "categoryCode", "currentPrice", "id", "isActive", "name", "quantityOnHand", "reorderQuantity", "retirementStatus", "unitOfMeasurementType") SELECT "basePrice", "categoryCode", "currentPrice", "id", "isActive", "name", "quantityOnHand", "reorderQuantity", "retirementStatus", "unitOfMeasurementType" FROM "Items";
DROP TABLE "Items";
ALTER TABLE "new_Items" RENAME TO "Items";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
