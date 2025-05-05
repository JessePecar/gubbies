-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categories" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "canPromote" BOOLEAN NOT NULL DEFAULT false,
    "canTransfer" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Categories" ("canPromote", "code", "name") SELECT "canPromote", "code", "name" FROM "Categories";
DROP TABLE "Categories";
ALTER TABLE "new_Categories" RENAME TO "Categories";
CREATE TABLE "new_Family" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "subcategoryCode" TEXT NOT NULL,
    "name" TEXT,
    "locationId" INTEGER,
    "canPromote" BOOLEAN NOT NULL DEFAULT false,
    "canTransfer" BOOLEAN NOT NULL DEFAULT true,
    "canPriceChange" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Family_subcategoryCode_fkey" FOREIGN KEY ("subcategoryCode") REFERENCES "Subcategory" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Family_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "ShelfLocation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Family" ("canPromote", "code", "locationId", "name", "subcategoryCode") SELECT "canPromote", "code", "locationId", "name", "subcategoryCode" FROM "Family";
DROP TABLE "Family";
ALTER TABLE "new_Family" RENAME TO "Family";
CREATE TABLE "new_Subcategory" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "categoryCode" TEXT NOT NULL,
    "name" TEXT,
    "canPromote" BOOLEAN NOT NULL DEFAULT false,
    "canTransfer" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Subcategory_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "Categories" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subcategory" ("canPromote", "categoryCode", "code", "name") SELECT "canPromote", "categoryCode", "code", "name" FROM "Subcategory";
DROP TABLE "Subcategory";
ALTER TABLE "new_Subcategory" RENAME TO "Subcategory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
