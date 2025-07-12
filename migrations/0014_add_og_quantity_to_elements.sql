-- AlterTable
ALTER TABLE "Element" ADD COLUMN "og_quantity" INTEGER;

-- DropTable
PRAGMA foreign_keys=off;
PRAGMA foreign_keys=on;
