/*
  Warnings:

  - A unique constraint covering the columns `[userId,supplierId]` on the table `supplierPayments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "supplierPayments_userId_supplierId_key" ON "supplierPayments"("userId", "supplierId");
