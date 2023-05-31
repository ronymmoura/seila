/*
  Warnings:

  - Changed the type of `closingDate` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "closingDate",
ADD COLUMN     "closingDate" INTEGER NOT NULL;
