-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "gender" TEXT,
    "nid" TEXT,
    "presentAddress" TEXT,
    "permanentAddress" TEXT,
    "profileImage" TEXT,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "reOrderAlert" INTEGER NOT NULL,
    "productImage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "productStock" INTEGER NOT NULL,
    "othersStock" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variants" (
    "id" TEXT NOT NULL,
    "imeiNumber" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "rom" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "purchaseRate" INTEGER NOT NULL,
    "sellingPrice" INTEGER NOT NULL,
    "vats" INTEGER NOT NULL,
    "discounts" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplierPayments" (
    "id" TEXT NOT NULL,
    "totalPay" INTEGER NOT NULL,
    "totalSellPrice" INTEGER NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplierPayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "gender" TEXT,
    "nid" TEXT,
    "presentAddress" TEXT,
    "permanentAddress" TEXT,
    "profileImage" TEXT,
    "uniqueId" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "returns" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "supplierId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "returns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "purchaseRate" TEXT NOT NULL,
    "sellingPrice" TEXT NOT NULL,
    "discounts" INTEGER NOT NULL,
    "vats" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "totalStock" INTEGER NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "additionalPurchaseId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "additionalProductPurchases" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "additionalProductPurchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sells" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "vats" INTEGER NOT NULL,
    "discounts" INTEGER NOT NULL,
    "sellingPrice" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "totalPay" INTEGER NOT NULL,
    "totalSellPrice" INTEGER NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "sellVariantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sellvariants" (
    "id" TEXT NOT NULL,
    "imeiNumber" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "rom" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "purchaseRate" INTEGER NOT NULL,
    "sellingPrice" INTEGER NOT NULL,
    "vats" INTEGER NOT NULL,
    "discounts" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sellvariants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "nid" TEXT,
    "presentAddress" TEXT,
    "permanentAddress" TEXT,
    "profileImage" TEXT,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNo_key" ON "users"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "users_uniqueId_key" ON "users"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "supplierPayments_userId_key" ON "supplierPayments"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_email_key" ON "suppliers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_phoneNo_key" ON "suppliers"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_phoneNo_key" ON "customers"("phoneNo");

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierPayments" ADD CONSTRAINT "supplierPayments_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierPayments" ADD CONSTRAINT "supplierPayments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "returns" ADD CONSTRAINT "returns_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_additionalPurchaseId_fkey" FOREIGN KEY ("additionalPurchaseId") REFERENCES "additionalProductPurchases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sells" ADD CONSTRAINT "sells_sellVariantId_fkey" FOREIGN KEY ("sellVariantId") REFERENCES "sellvariants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sells" ADD CONSTRAINT "sells_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sells" ADD CONSTRAINT "sells_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
