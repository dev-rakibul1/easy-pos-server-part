/*
  Warnings:

  - You are about to drop the `sellvariants` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `sellGroups` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "sellvariants";

-- CreateIndex
CREATE UNIQUE INDEX "sellGroups_customerId_key" ON "sellGroups"("customerId");

-- AddForeignKey
ALTER TABLE "sellGroups" ADD CONSTRAINT "sellGroups_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
