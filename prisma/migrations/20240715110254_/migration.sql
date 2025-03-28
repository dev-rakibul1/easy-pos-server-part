-- AlterTable
ALTER TABLE "customerPayments" ALTER COLUMN "totalPay" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalDue" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalSellPrice" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "sells" ALTER COLUMN "vats" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "discounts" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "sellingPrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalSellPrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "purchaseRate" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "supplierSells" ALTER COLUMN "totalSellAmounts" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalDue" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalPay" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "additionalExpenses" (
    "id" TEXT NOT NULL,
    "expenseAmount" DOUBLE PRECISION NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "additionalExpenses_pkey" PRIMARY KEY ("id")
);
