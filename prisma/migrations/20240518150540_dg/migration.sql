/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `_PurchaseToSuppliers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PurchaseToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PurchaseToSuppliers" DROP CONSTRAINT "_PurchaseToSuppliers_A_fkey";

-- DropForeignKey
ALTER TABLE "_PurchaseToSuppliers" DROP CONSTRAINT "_PurchaseToSuppliers_B_fkey";

-- DropForeignKey
ALTER TABLE "_PurchaseToUser" DROP CONSTRAINT "_PurchaseToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PurchaseToUser" DROP CONSTRAINT "_PurchaseToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_purchaseId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "purchaseId";

-- DropTable
DROP TABLE "_PurchaseToSuppliers";

-- DropTable
DROP TABLE "_PurchaseToUser";
