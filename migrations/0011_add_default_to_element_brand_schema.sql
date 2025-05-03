-- DropTable
PRAGMA foreign_keys=off;
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Element" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL DEFAULT 'generic',
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Element_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Element" ("brand", "createdAt", "id", "name", "quantity", "type", "unit", "updatedAt", "userId") SELECT coalesce("brand", 'generic') AS "brand", "createdAt", "id", "name", "quantity", "type", "unit", "updatedAt", "userId" FROM "Element";
DROP TABLE "Element";
ALTER TABLE "new_Element" RENAME TO "Element";
CREATE UNIQUE INDEX "Element_name_userId_brand_key" ON "Element"("name", "userId", "brand");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
