/*
  Warnings:

  - You are about to drop the column `productId` on the `supplierSellVariants` table. All the data in the column will be lost.
  - Added the required column `supplierSellProductId` to the `supplierSellVariants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "supplierSellVariants" DROP CONSTRAINT "supplierSellVariants_productId_fkey";

-- AlterTable
ALTER TABLE "supplierSellVariants" DROP COLUMN "productId",
ADD COLUMN     "supplierSellProductId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "supplierSellVariants" ADD CONSTRAINT "supplierSellVariants_supplierSellProductId_fkey" FOREIGN KEY ("supplierSellProductId") REFERENCES "supplierSellProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
