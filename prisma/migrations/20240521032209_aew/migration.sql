/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `suppliers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "supplierPayments_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_uniqueId_key" ON "suppliers"("uniqueId");
