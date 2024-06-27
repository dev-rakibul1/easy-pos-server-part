/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `purchaseGroups` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueId` to the `purchaseGroups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchaseGroups" ADD COLUMN     "uniqueId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "purchaseGroups_uniqueId_key" ON "purchaseGroups"("uniqueId");
