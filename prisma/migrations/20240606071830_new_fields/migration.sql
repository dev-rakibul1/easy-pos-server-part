/*
  Warnings:

  - You are about to drop the column `discounts` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseRate` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the column `sellingPrice` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the column `vats` on the `variants` table. All the data in the column will be lost.
  - Added the required column `ram` to the `purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "ram" TEXT NOT NULL,
ADD COLUMN     "room" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "variants" DROP COLUMN "discounts",
DROP COLUMN "purchaseRate",
DROP COLUMN "sellingPrice",
DROP COLUMN "vats",
ALTER COLUMN "ram" DROP NOT NULL,
ALTER COLUMN "rom" DROP NOT NULL,
ALTER COLUMN "color" DROP NOT NULL;
