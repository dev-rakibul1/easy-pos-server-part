/*
  Warnings:

  - You are about to drop the column `modelName` on the `returns` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `returns` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "returns" DROP COLUMN "modelName",
DROP COLUMN "productName";
