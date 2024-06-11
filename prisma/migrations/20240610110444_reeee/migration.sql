/*
  Warnings:

  - You are about to drop the column `uniqueId` on the `supplierSells` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "supplierSells_uniqueId_key";

-- AlterTable
ALTER TABLE "supplierSells" DROP COLUMN "uniqueId";
