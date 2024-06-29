/*
  Warnings:

  - Added the required column `productId` to the `customerPurchaseProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customerPurchaseProducts" ADD COLUMN     "productId" TEXT NOT NULL;
