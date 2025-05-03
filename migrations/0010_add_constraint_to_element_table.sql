-- DropTable
PRAGMA foreign_keys=off;
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE UNIQUE INDEX "Element_name_userId_brand_key" ON "Element"("name", "userId", "brand");
