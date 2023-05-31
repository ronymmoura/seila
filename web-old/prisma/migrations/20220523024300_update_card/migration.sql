/*
  Warnings:

  - Added the required column `color` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
