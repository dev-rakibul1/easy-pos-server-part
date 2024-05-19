/*
  Warnings:

  - Added the required column `imeiNumber` to the `variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "variants" ADD COLUMN     "imeiNumber" TEXT NOT NULL;
