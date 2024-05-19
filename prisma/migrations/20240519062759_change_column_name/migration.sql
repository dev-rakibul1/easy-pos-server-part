/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `_PurchaseToSuppliers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PurchaseToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierId` to the `purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `purchases` table without a default value. This is not possible if the table is not empty.

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

-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "supplierId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PurchaseToSuppliers";

-- DropTable
DROP TABLE "_PurchaseToUser";

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
