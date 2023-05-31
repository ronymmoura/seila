/*
  Warnings:

  - Added the required column `date` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "installmentValue" DECIMAL(65,30),
ADD COLUMN     "numberOfInstallments" INTEGER,
ADD COLUMN     "paidInstallments" INTEGER;

-- CreateTable
CREATE TABLE "Installment" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3),
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "purchaseId" INTEGER,

    CONSTRAINT "Installment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;
