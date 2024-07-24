/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `additionalExpenses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueId` to the `additionalExpenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "additionalExpenses" ADD COLUMN     "uniqueId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "additionalExpenses_uniqueId_key" ON "additionalExpenses"("uniqueId");
