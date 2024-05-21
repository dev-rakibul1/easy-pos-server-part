/*
  Warnings:

  - Added the required column `color` to the `returns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discounts` to the `returns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imeiNumber` to the `returns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseRate` to the `returns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ram` to the `returns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rom` to the `returns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellingPrice` to the `returns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vats` to the `returns` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "returns" DROP CONSTRAINT "returns_variantId_fkey";

-- AlterTable
ALTER TABLE "returns" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "discounts" INTEGER NOT NULL,
ADD COLUMN     "imeiNumber" TEXT NOT NULL,
ADD COLUMN     "purchaseRate" INTEGER NOT NULL,
ADD COLUMN     "ram" TEXT NOT NULL,
ADD COLUMN     "rom" TEXT NOT NULL,
ADD COLUMN     "sellingPrice" INTEGER NOT NULL,
ADD COLUMN     "vats" INTEGER NOT NULL;
