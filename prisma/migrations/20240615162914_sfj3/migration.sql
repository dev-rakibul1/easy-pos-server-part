/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `supplierSellProducts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[supplierSellProductId]` on the table `purchases` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supplierSellProductId` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "supplierSellProducts" DROP CONSTRAINT "supplierSellProducts_purchaseId_fkey";

-- DropIndex
DROP INDEX "supplierSellProducts_purchaseId_key";

-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "supplierSellProductId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "supplierSellProducts" DROP COLUMN "purchaseId";

-- CreateIndex
CREATE UNIQUE INDEX "purchases_supplierSellProductId_key" ON "purchases"("supplierSellProductId");

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_supplierSellProductId_fkey" FOREIGN KEY ("supplierSellProductId") REFERENCES "supplierSellProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
