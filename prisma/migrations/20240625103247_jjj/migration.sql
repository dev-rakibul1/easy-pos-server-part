/*
  Warnings:

  - You are about to alter the column `payAmount` on the `payInSuppliers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "payInSuppliers" ALTER COLUMN "payAmount" SET DATA TYPE INTEGER;
