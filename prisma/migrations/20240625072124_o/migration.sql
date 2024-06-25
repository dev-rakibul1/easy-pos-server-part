/*
  Warnings:

  - You are about to drop the `payInSupplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payInSupplier" DROP CONSTRAINT "payInSupplier_purchaseGroupId_fkey";

-- DropTable
DROP TABLE "payInSupplier";

-- CreateTable
CREATE TABLE "payInSuppliers" (
    "id" TEXT NOT NULL,
    "payAmount" DOUBLE PRECISION NOT NULL,
    "SupplierSellId" TEXT NOT NULL,
    "purchaseGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payInSuppliers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payInSuppliers" ADD CONSTRAINT "payInSuppliers_purchaseGroupId_fkey" FOREIGN KEY ("purchaseGroupId") REFERENCES "purchaseGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
