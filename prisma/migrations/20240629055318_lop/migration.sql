/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `sells` table. All the data in the column will be lost.
  - You are about to drop the column `totalPay` on the `sells` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sells" DROP COLUMN "paymentMethod",
DROP COLUMN "totalPay";
