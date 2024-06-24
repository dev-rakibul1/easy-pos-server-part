/*
  Warnings:

  - Added the required column `userId` to the `supplierSellProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "supplierSellProducts" ADD COLUMN     "userId" TEXT NOT NULL;
