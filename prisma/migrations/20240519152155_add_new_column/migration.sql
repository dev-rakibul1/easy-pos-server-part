/*
  Warnings:

  - Added the required column `uniqueId` to the `supplierPayments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "supplierPayments" ADD COLUMN     "uniqueId" TEXT NOT NULL;
