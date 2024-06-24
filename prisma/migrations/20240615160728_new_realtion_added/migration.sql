/*
  Warnings:

  - A unique constraint covering the columns `[purchaseId]` on the table `supplierSellProducts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `purchaseId` to the `supplierSellProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "supplierSellProducts" ADD COLUMN     "purchaseId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "supplierSellProducts_purchaseId_key" ON "supplierSellProducts"("purchaseId");

-- AddForeignKey
ALTER TABLE "supplierSellProducts" ADD CONSTRAINT "supplierSellProducts_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
