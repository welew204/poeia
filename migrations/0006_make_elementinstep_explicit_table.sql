-- DropIndex
DROP INDEX "_ElementToStep_B_index";

-- DropIndex
DROP INDEX "_ElementToStep_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ElementToStep";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ElementInStep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stepId" TEXT NOT NULL,
    "elementId" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    CONSTRAINT "ElementInStep_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ElementInStep_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Step" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "recipeId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Step" ("action", "createdAt", "id", "recipeId", "stepNumber", "updatedAt") SELECT "action", "createdAt", "id", "recipeId", "stepNumber", "updatedAt" FROM "Step";
DROP TABLE "Step";
ALTER TABLE "new_Step" RENAME TO "Step";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
