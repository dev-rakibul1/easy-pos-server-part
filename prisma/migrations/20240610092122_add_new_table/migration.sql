/*
  Warnings:

  - Added the required column `supplierSellsId` to the `variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "variants" ADD COLUMN     "supplierSellsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "supplierSells" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalSellAmounts" INTEGER NOT NULL,
    "totalDue" INTEGER NOT NULL,
    "totalPay" INTEGER NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplierSells_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "supplierSells_uniqueId_key" ON "supplierSells"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "supplierSells_supplierId_key" ON "supplierSells"("supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "supplierSells_userId_key" ON "supplierSells"("userId");

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_supplierSellsId_fkey" FOREIGN KEY ("supplierSellsId") REFERENCES "supplierSells"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierSells" ADD CONSTRAINT "supplierSells_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierSells" ADD CONSTRAINT "supplierSells_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
