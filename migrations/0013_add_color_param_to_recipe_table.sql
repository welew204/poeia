-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN "colorHex" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
PRAGMA foreign_keys=on;
