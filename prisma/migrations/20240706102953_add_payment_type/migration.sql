-- AlterTable
ALTER TABLE "customerPurchases" ADD COLUMN     "paymentType" TEXT;

-- AlterTable
ALTER TABLE "supplierPayments" ADD COLUMN     "paymentType" TEXT;

-- AlterTable
ALTER TABLE "supplierReturnPayments" ADD COLUMN     "paymentType" TEXT;

-- AlterTable
ALTER TABLE "supplierSells" ADD COLUMN     "paymentType" TEXT;
