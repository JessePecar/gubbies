/*
  Warnings:

  - Added the required column `postalCode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "postalCode" INTEGER NOT NULL
);
INSERT INTO "new_Address" ("address1", "address2", "city", "countryCode", "id", "state") SELECT "address1", "address2", "city", "countryCode", "id", "state" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
