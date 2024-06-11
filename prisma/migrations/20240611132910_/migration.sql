-- CreateTable
CREATE TABLE "supplierSellVariants" (
    "id" TEXT NOT NULL,
    "imeiNumber" TEXT NOT NULL,
    "ram" TEXT,
    "rom" TEXT,
    "color" TEXT,
    "supplierSellId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplierSellVariants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "supplierSellVariants" ADD CONSTRAINT "supplierSellVariants_supplierSellId_fkey" FOREIGN KEY ("supplierSellId") REFERENCES "supplierSells"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
