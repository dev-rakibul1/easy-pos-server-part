/*
  Warnings:

  - Added the required column `quantity` to the `sells` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sells" ADD COLUMN     "quantity" INTEGER NOT NULL;
