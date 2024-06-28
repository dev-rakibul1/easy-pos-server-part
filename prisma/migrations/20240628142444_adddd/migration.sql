/*
  Warnings:

  - You are about to drop the column `customerPurchaseId` on the `customers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_customerPurchaseId_fkey";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "customerPurchaseId";

-- AddForeignKey
ALTER TABLE "customerPurchases" ADD CONSTRAINT "customerPurchases_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
