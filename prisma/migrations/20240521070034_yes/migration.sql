/*
  Warnings:

  - Added the required column `totalDue` to the `supplierPayments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "supplierPayments" ADD COLUMN     "totalDue" INTEGER NOT NULL;
