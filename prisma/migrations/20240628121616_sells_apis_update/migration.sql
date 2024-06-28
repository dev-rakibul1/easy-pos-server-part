/*
  Warnings:

  - You are about to drop the column `discounts` on the `sellvariants` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseRate` on the `sellvariants` table. All the data in the column will be lost.
  - You are about to drop the column `sellingPrice` on the `sellvariants` table. All the data in the column will be lost.
  - You are about to drop the column `vats` on the `sellvariants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerPurchaseProductId]` on the table `sells` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerPurchaseId` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPurchaseProductId` to the `sells` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `sells` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "customerPurchaseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sells" ADD COLUMN     "customerPurchaseProductId" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sellvariants" DROP COLUMN "discounts",
DROP COLUMN "purchaseRate",
DROP COLUMN "sellingPrice",
DROP COLUMN "vats";

-- CreateTable
CREATE TABLE "sellGroups" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sellGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customerPurchaseProducts" (
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
    "sellGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customerPurchaseProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customerPurchaseVariants" (
    "id" TEXT NOT NULL,
    "imeiNumber" TEXT NOT NULL,
    "ram" TEXT,
    "rom" TEXT,
    "color" TEXT,
    "customerPurchaseProductId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customerPurchaseVariants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customerPurchases" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPurchaseAmounts" INTEGER NOT NULL,
    "totalDue" INTEGER NOT NULL,
    "totalPay" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sellGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customerPurchases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sellGroups_uniqueId_key" ON "sellGroups"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "customerPurchases_sellGroupId_key" ON "customerPurchases"("sellGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "sells_customerPurchaseProductId_key" ON "sells"("customerPurchaseProductId");

-- AddForeignKey
ALTER TABLE "sells" ADD CONSTRAINT "sells_customerPurchaseProductId_fkey" FOREIGN KEY ("customerPurchaseProductId") REFERENCES "customerPurchaseProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPurchaseProducts" ADD CONSTRAINT "customerPurchaseProducts_sellGroupId_fkey" FOREIGN KEY ("sellGroupId") REFERENCES "sellGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPurchaseVariants" ADD CONSTRAINT "customerPurchaseVariants_customerPurchaseProductId_fkey" FOREIGN KEY ("customerPurchaseProductId") REFERENCES "customerPurchaseProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPurchases" ADD CONSTRAINT "customerPurchases_sellGroupId_fkey" FOREIGN KEY ("sellGroupId") REFERENCES "sellGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_customerPurchaseId_fkey" FOREIGN KEY ("customerPurchaseId") REFERENCES "customerPurchases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
