/*
  Warnings:

  - You are about to alter the column `value` on the `Purchase` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `installmentValue` on the `Purchase` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "value" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "installmentValue" SET DATA TYPE DECIMAL(10,2);
