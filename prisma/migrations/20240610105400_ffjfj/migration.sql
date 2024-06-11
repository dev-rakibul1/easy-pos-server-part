/*
  Warnings:

  - You are about to drop the column `supplierSellsId` on the `variants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "variants" DROP CONSTRAINT "variants_supplierSellsId_fkey";

-- AlterTable
ALTER TABLE "variants" DROP COLUMN "supplierSellsId";
