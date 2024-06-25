-- CreateTable
CREATE TABLE "payInSupplier" (
    "id" TEXT NOT NULL,
    "payAmount" DOUBLE PRECISION NOT NULL,
    "purchaseGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payInSupplier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payInSupplier" ADD CONSTRAINT "payInSupplier_purchaseGroupId_fkey" FOREIGN KEY ("purchaseGroupId") REFERENCES "purchaseGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
