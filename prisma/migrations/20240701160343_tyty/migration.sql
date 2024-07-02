/*
  Warnings:

  - You are about to drop the column `totalSellAmounts` on the `supplierReturnPayments` table. All the data in the column will be lost.
  - Added the required column `totalReturnAmount` to the `supplierReturnPayments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "supplierReturnPayments" DROP COLUMN "totalSellAmounts",
ADD COLUMN     "totalReturnAmount" INTEGER NOT NULL;
