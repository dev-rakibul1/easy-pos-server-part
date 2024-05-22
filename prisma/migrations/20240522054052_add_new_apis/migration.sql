/*
  Warnings:

  - Added the required column `uniqueId` to the `colors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueId` to the `currencyType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountValue` to the `discounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueId` to the `discounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueId` to the `vats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vatValue` to the `vats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "colors" ADD COLUMN     "colorCode" TEXT,
ADD COLUMN     "uniqueId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "currencyType" ADD COLUMN     "uniqueId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "discounts" ADD COLUMN     "discountValue" INTEGER NOT NULL,
ADD COLUMN     "uniqueId" TEXT NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "vats" ADD COLUMN     "uniqueId" TEXT NOT NULL,
ADD COLUMN     "vatValue" INTEGER NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT;
