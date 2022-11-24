-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_categoryId_fkey";

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "cardId" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
