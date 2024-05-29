-- CreateTable
CREATE TABLE "brands" (
    "id" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "description" TEXT,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brands_uniqueId_key" ON "brands"("uniqueId");
