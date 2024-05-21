/*
  Warnings:

  - Added the required column `variantId` to the `returns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "returns" ADD COLUMN     "variantId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "returns" ADD CONSTRAINT "returns_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
