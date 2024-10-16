/*
  Warnings:

  - Added the required column `issueSubmitDate` to the `warranties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "warranties" ADD COLUMN     "issueSubmitDate" TEXT NOT NULL;
