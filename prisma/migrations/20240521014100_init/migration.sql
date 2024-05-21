/*
  Warnings:

  - Changed the type of `purchaseRate` on the `purchases` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sellingPrice` on the `purchases` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "supplierPayments_userId_supplierId_key";

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "purchaseRate",
ADD COLUMN     "purchaseRate" INTEGER NOT NULL,
DROP COLUMN "sellingPrice",
ADD COLUMN     "sellingPrice" INTEGER NOT NULL;
