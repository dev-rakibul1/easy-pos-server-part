/*
  Warnings:

  - Made the column `supplierId` on table `returns` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "returns" DROP CONSTRAINT "returns_supplierId_fkey";

-- AlterTable
ALTER TABLE "returns" ALTER COLUMN "supplierId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "returns" ADD CONSTRAINT "returns_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
