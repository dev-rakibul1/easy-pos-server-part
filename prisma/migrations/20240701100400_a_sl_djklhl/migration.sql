/*
  Warnings:

  - You are about to drop the column `discounts` on the `returns` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseRate` on the `returns` table. All the data in the column will be lost.
  - You are about to drop the column `sellingPrice` on the `returns` table. All the data in the column will be lost.
  - You are about to drop the column `vats` on the `returns` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "returns" DROP COLUMN "discounts",
DROP COLUMN "purchaseRate",
DROP COLUMN "sellingPrice",
DROP COLUMN "vats";
