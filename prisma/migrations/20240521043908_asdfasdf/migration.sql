/*
  Warnings:

  - Added the required column `uniqueId` to the `returns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "returns" ADD COLUMN     "uniqueId" TEXT NOT NULL;
