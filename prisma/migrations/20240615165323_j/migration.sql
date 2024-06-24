/*
  Warnings:

  - A unique constraint covering the columns `[purchaseGroupId]` on the table `supplierSells` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `purchaseGroupId` to the `supplierSells` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "supplierSells" ADD COLUMN     "purchaseGroupId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "supplierSells_purchaseGroupId_key" ON "supplierSells"("purchaseGroupId");

-- AddForeignKey
ALTER TABLE "supplierSells" ADD CONSTRAINT "supplierSells_purchaseGroupId_fkey" FOREIGN KEY ("purchaseGroupId") REFERENCES "purchaseGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
