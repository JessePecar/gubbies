-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "hierarchyTier" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Roles" ("id", "name") SELECT "id", "name" FROM "Roles";
DROP TABLE "Roles";
ALTER TABLE "new_Roles" RENAME TO "Roles";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
