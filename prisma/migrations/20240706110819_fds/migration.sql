-- AlterTable
ALTER TABLE "additionalMoneyBacks" ADD COLUMN     "paymentType" TEXT;

-- AlterTable
ALTER TABLE "customerPayInUsers" ADD COLUMN     "paymentType" TEXT;

-- AlterTable
ALTER TABLE "customerPayments" ADD COLUMN     "paymentType" TEXT;

-- AlterTable
ALTER TABLE "payInSuppliers" ADD COLUMN     "paymentType" TEXT;
