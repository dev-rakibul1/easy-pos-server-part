/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `customerPurchases` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "sellGroups" DROP CONSTRAINT "sellGroups_customerId_fkey";

-- DropIndex
DROP INDEX "sellGroups_customerId_key";

-- CreateIndex
CREATE UNIQUE INDEX "customerPurchases_customerId_key" ON "customerPurchases"("customerId");
