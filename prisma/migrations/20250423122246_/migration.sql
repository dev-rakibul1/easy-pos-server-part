-- CreateEnum
CREATE TYPE "CustomerRole" AS ENUM ('customer', 'visitor');

-- CreateEnum
CREATE TYPE "CartStatus" AS ENUM ('cart', 'wishlist');

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "CustomerRole" NOT NULL DEFAULT 'customer';

-- CreateTable
CREATE TABLE "add_to_cart" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" "CartStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "add_to_cart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "add_to_cart_customerId_productId_key" ON "add_to_cart"("customerId", "productId");

-- AddForeignKey
ALTER TABLE "add_to_cart" ADD CONSTRAINT "add_to_cart_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "add_to_cart" ADD CONSTRAINT "add_to_cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
