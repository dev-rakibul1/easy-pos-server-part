/*
  Warnings:

  - Added the required column `productId` to the `returns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `returns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "returns" ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;
