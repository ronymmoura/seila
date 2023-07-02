-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "monthGroceriesId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthGroceries" (
    "id" TEXT NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthGroceries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemHistory" (
    "id" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "monthGroceriesId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "ItemHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemHistory" ADD CONSTRAINT "ItemHistory_monthGroceriesId_fkey" FOREIGN KEY ("monthGroceriesId") REFERENCES "MonthGroceries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemHistory" ADD CONSTRAINT "ItemHistory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
