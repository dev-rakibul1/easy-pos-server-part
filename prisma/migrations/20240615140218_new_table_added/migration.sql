/*
  Warnings:

  - Added the required column `purchaseGroupId` to the `supplierSellProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "supplierSellProducts" ADD COLUMN     "purchaseGroupId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "purchaseGroups" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "supplierSellId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchaseGroups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "supplierSellProducts" ADD CONSTRAINT "supplierSellProducts_purchaseGroupId_fkey" FOREIGN KEY ("purchaseGroupId") REFERENCES "purchaseGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
