/*
  Warnings:

  - You are about to drop the column `sellVariantId` on the `sells` table. All the data in the column will be lost.
  - Added the required column `customerPurchaseVariantId` to the `sells` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sells" DROP CONSTRAINT "sells_sellVariantId_fkey";

-- AlterTable
ALTER TABLE "sells" DROP COLUMN "sellVariantId",
ADD COLUMN     "customerPurchaseVariantId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sells" ADD CONSTRAINT "sells_customerPurchaseVariantId_fkey" FOREIGN KEY ("customerPurchaseVariantId") REFERENCES "customerPurchaseVariants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
