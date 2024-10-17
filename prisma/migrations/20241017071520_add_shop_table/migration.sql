-- CreateTable
CREATE TABLE "shops" (
    "id" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "hours" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "products" TEXT,
    "establishedDate" TEXT NOT NULL,
    "aboutShop" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shops_phone_key" ON "shops"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "shops_email_key" ON "shops"("email");
