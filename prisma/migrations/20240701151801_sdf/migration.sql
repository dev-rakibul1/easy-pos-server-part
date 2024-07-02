/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `returnGroups` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueId` to the `returnGroups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "returnGroups" ADD COLUMN     "uniqueId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "returnGroups_uniqueId_key" ON "returnGroups"("uniqueId");
