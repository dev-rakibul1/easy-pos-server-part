/*
  Warnings:

  - You are about to drop the column `totalStock` on the `purchases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "totalStock",
ADD COLUMN     "otherStock" INTEGER,
ADD COLUMN     "productStock" INTEGER;
