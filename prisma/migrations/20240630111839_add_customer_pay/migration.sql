-- CreateTable
CREATE TABLE "customerPayInUsers" (
    "id" TEXT NOT NULL,
    "payAmount" INTEGER NOT NULL,
    "customerPurchaseId" TEXT NOT NULL,
    "sellGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customerPayInUsers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customerPayInUsers" ADD CONSTRAINT "customerPayInUsers_sellGroupId_fkey" FOREIGN KEY ("sellGroupId") REFERENCES "sellGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
