/*
  Warnings:

  - You are about to drop the column `returnId` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the column `sellId` on the `variants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "variants" DROP CONSTRAINT "variants_returnId_fkey";

-- DropForeignKey
ALTER TABLE "variants" DROP CONSTRAINT "variants_sellId_fkey";

-- AlterTable
ALTER TABLE "variants" DROP COLUMN "returnId",
DROP COLUMN "sellId";
