-- CreateTable
CREATE TABLE "customerPayments" (
    "id" TEXT NOT NULL,
    "totalPay" INTEGER NOT NULL,
    "totalDue" INTEGER NOT NULL,
    "totalSellPrice" INTEGER NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customerPayments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customerPayments" ADD CONSTRAINT "customerPayments_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPayments" ADD CONSTRAINT "customerPayments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
