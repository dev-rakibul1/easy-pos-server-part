/*
  Warnings:

  - Added the required column `purchaseId` to the `variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "variants" ADD COLUMN     "purchaseId" TEXT NOT NULL;
