/*
  Warnings:

  - Added the required column `userReturnProductsId` to the `returns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "returns" ADD COLUMN     "userReturnProductsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "returnGroups" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "returnGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userReturnProducts" (
    "id" TEXT NOT NULL,
    "productName" TEXT,
    "brandName" TEXT,
    "modelName" TEXT,
    "processor" TEXT,
    "unit" TEXT,
    "category" TEXT,
    "reOrderAlert" INTEGER,
    "productImage" TEXT,
    "description" TEXT,
    "productStock" INTEGER,
    "othersStock" INTEGER,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "returnGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userReturnProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplierReturnPayments" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalSellAmounts" INTEGER NOT NULL,
    "totalDue" INTEGER NOT NULL,
    "totalPay" INTEGER NOT NULL,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "returnGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplierReturnPayments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "returns" ADD CONSTRAINT "returns_userReturnProductsId_fkey" FOREIGN KEY ("userReturnProductsId") REFERENCES "userReturnProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userReturnProducts" ADD CONSTRAINT "userReturnProducts_returnGroupId_fkey" FOREIGN KEY ("returnGroupId") REFERENCES "returnGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierReturnPayments" ADD CONSTRAINT "supplierReturnPayments_returnGroupId_fkey" FOREIGN KEY ("returnGroupId") REFERENCES "returnGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
