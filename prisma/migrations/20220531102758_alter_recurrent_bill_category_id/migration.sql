-- DropForeignKey
ALTER TABLE "RecurrentBill" DROP CONSTRAINT "RecurrentBill_categoryId_fkey";

-- AlterTable
ALTER TABLE "RecurrentBill" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RecurrentBill" ADD CONSTRAINT "RecurrentBill_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
