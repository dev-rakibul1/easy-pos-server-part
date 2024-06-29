/*
  Warnings:

  - Added the required column `customerId` to the `customerPurchaseProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `customerPurchaseProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customerPurchaseProducts" ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;
