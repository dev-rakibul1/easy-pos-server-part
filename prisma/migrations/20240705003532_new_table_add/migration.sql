/*
  Warnings:

  - Added the required column `price` to the `returns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "returns" ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "additionalMoneyBacks" (
    "id" TEXT NOT NULL,
    "payAmount" INTEGER NOT NULL,
    "supplierReturnPaymentId" TEXT NOT NULL,
    "returnGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "additionalMoneyBacks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "additionalMoneyBacks" ADD CONSTRAINT "additionalMoneyBacks_returnGroupId_fkey" FOREIGN KEY ("returnGroupId") REFERENCES "returnGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
