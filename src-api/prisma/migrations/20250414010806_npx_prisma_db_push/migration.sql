-- CreateTable
CREATE TABLE "PermissionGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Permissions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "permissionGroupId" INTEGER,
    CONSTRAINT "Permissions_permissionGroupId_fkey" FOREIGN KEY ("permissionGroupId") REFERENCES "PermissionGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Permissions" ("id", "name") SELECT "id", "name" FROM "Permissions";
DROP TABLE "Permissions";
ALTER TABLE "new_Permissions" RENAME TO "Permissions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
