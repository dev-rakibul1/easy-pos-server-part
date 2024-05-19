/*
  Warnings:

  - You are about to drop the column `productId` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `purchases` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_productId_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_userId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "purchaseId" TEXT;

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "productId",
DROP COLUMN "supplierId",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_PurchaseToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PurchaseToSuppliers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PurchaseToUser_AB_unique" ON "_PurchaseToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PurchaseToUser_B_index" ON "_PurchaseToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PurchaseToSuppliers_AB_unique" ON "_PurchaseToSuppliers"("A", "B");

-- CreateIndex
CREATE INDEX "_PurchaseToSuppliers_B_index" ON "_PurchaseToSuppliers"("B");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchaseToUser" ADD CONSTRAINT "_PurchaseToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchaseToUser" ADD CONSTRAINT "_PurchaseToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchaseToSuppliers" ADD CONSTRAINT "_PurchaseToSuppliers_A_fkey" FOREIGN KEY ("A") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchaseToSuppliers" ADD CONSTRAINT "_PurchaseToSuppliers_B_fkey" FOREIGN KEY ("B") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
