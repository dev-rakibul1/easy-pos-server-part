/*
  Warnings:

  - You are about to drop the column `SupplierSellId` on the `payInSuppliers` table. All the data in the column will be lost.
  - Added the required column `supplierSellId` to the `payInSuppliers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payInSuppliers" DROP COLUMN "SupplierSellId",
ADD COLUMN     "supplierSellId" TEXT NOT NULL;
