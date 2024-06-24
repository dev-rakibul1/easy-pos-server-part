/*
  Warnings:

  - Added the required column `productId` to the `supplierSellProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "supplierSellProducts" ADD COLUMN     "productId" TEXT NOT NULL;
