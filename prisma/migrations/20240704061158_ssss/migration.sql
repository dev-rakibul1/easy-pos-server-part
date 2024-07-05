/*
  Warnings:

  - A unique constraint covering the columns `[returnGroupId]` on the table `supplierReturnPayments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "supplierReturnPayments_returnGroupId_key" ON "supplierReturnPayments"("returnGroupId");

-- AddForeignKey
ALTER TABLE "supplierReturnPayments" ADD CONSTRAINT "supplierReturnPayments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
