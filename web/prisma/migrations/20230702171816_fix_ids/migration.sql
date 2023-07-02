/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ItemHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ItemHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `MonthGroceries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MonthGroceries` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `categoryId` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `monthGroceriesId` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `monthGroceriesId` on the `ItemHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `itemId` on the `ItemHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ItemHistory" DROP CONSTRAINT "ItemHistory_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ItemHistory" DROP CONSTRAINT "ItemHistory_monthGroceriesId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
DROP COLUMN "monthGroceriesId",
ADD COLUMN     "monthGroceriesId" INTEGER NOT NULL,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ItemHistory" DROP CONSTRAINT "ItemHistory_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "monthGroceriesId",
ADD COLUMN     "monthGroceriesId" INTEGER NOT NULL,
DROP COLUMN "itemId",
ADD COLUMN     "itemId" INTEGER NOT NULL,
ADD CONSTRAINT "ItemHistory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MonthGroceries" DROP CONSTRAINT "MonthGroceries_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MonthGroceries_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemHistory" ADD CONSTRAINT "ItemHistory_monthGroceriesId_fkey" FOREIGN KEY ("monthGroceriesId") REFERENCES "MonthGroceries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemHistory" ADD CONSTRAINT "ItemHistory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
