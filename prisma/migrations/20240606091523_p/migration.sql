/*
  Warnings:

  - You are about to drop the column `otherStock` on the `purchases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "otherStock",
ADD COLUMN     "othersStock" INTEGER;
