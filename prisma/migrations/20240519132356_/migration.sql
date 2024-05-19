-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "additionalPurchaseId" TEXT;

-- CreateTable
CREATE TABLE "additionalProductPurchases" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "additionalProductPurchases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_additionalPurchaseId_fkey" FOREIGN KEY ("additionalPurchaseId") REFERENCES "additionalProductPurchases"("id") ON DELETE SET NULL ON UPDATE CASCADE;
