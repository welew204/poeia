-- DropTable
PRAGMA foreign_keys=off;
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ElementInStep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stepId" TEXT NOT NULL,
    "elementId" TEXT NOT NULL,
    "qty" DECIMAL NOT NULL,
    "unit" TEXT NOT NULL,
    CONSTRAINT "ElementInStep_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ElementInStep_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ElementInStep" ("elementId", "id", "qty", "stepId", "unit") SELECT "elementId", "id", "qty", "stepId", "unit" FROM "ElementInStep";
DROP TABLE "ElementInStep";
ALTER TABLE "new_ElementInStep" RENAME TO "ElementInStep";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
