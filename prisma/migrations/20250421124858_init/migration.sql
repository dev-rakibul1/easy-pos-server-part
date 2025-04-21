-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('super_admin', 'admin', 'user', 'moderator', 'content_manager', 'marketing_manager');

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
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "password" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
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
    "processor" TEXT,
    "unit" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "reOrderAlert" INTEGER NOT NULL,
    "productImage" TEXT,
    "description" TEXT,
    "uniqueId" TEXT,
    "productStock" INTEGER,
    "othersStock" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variants" (
    "id" TEXT NOT NULL,
    "imeiNumber" TEXT NOT NULL,
    "ram" TEXT,
    "rom" TEXT,
    "color" TEXT,
    "productId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplierPayments" (
    "id" TEXT NOT NULL,
    "totalPay" INTEGER NOT NULL,
    "totalDue" INTEGER NOT NULL,
    "totalSellPrice" INTEGER NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "paymentType" TEXT,
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
    "uniqueId" TEXT NOT NULL,
    "imeiNumber" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "rom" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "supplierId" TEXT NOT NULL,
    "userReturnProductsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "returns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "returnGroups" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "returnGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "additionalMoneyBacks" (
    "id" TEXT NOT NULL,
    "payAmount" INTEGER NOT NULL,
    "supplierReturnPaymentId" TEXT NOT NULL,
    "paymentType" TEXT,
    "returnGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "additionalMoneyBacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userReturnProducts" (
    "id" TEXT NOT NULL,
    "productName" TEXT,
    "brandName" TEXT,
    "modelName" TEXT,
    "processor" TEXT,
    "unit" TEXT,
    "category" TEXT,
    "reOrderAlert" INTEGER,
    "productImage" TEXT,
    "description" TEXT,
    "productStock" INTEGER,
    "othersStock" INTEGER,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "returnGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userReturnProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplierReturnPayments" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalReturnAmount" INTEGER NOT NULL,
    "totalDue" INTEGER NOT NULL,
    "totalPay" INTEGER NOT NULL,
    "paymentType" TEXT,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "returnGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplierReturnPayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "purchaseRate" DOUBLE PRECISION NOT NULL,
    "sellingPrice" DOUBLE PRECISION NOT NULL,
    "discounts" DOUBLE PRECISION,
    "vats" DOUBLE PRECISION,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "productStock" INTEGER,
    "othersStock" INTEGER,
    "color" TEXT,
    "uniqueId" TEXT NOT NULL,
    "ram" TEXT,
    "room" TEXT,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "supplierSellId" TEXT NOT NULL,
    "supplierSellProductId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sells" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "vats" DOUBLE PRECISION NOT NULL,
    "discounts" DOUBLE PRECISION NOT NULL,
    "sellingPrice" DOUBLE PRECISION NOT NULL,
    "totalSellPrice" DOUBLE PRECISION NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchaseRate" DOUBLE PRECISION,
    "variantId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "customerPurchaseProductId" TEXT NOT NULL,
    "customerPurchaseVariantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sellGroups" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sellGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customerPurchaseProducts" (
    "id" TEXT NOT NULL,
    "productName" TEXT,
    "brandName" TEXT,
    "modelName" TEXT,
    "processor" TEXT,
    "unit" TEXT,
    "category" TEXT,
    "reOrderAlert" INTEGER,
    "productImage" TEXT,
    "description" TEXT,
    "productStock" INTEGER,
    "othersStock" INTEGER,
    "customerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sellGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customerPurchaseProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customerPurchaseVariants" (
    "id" TEXT NOT NULL,
    "imeiNumber" TEXT NOT NULL,
    "ram" TEXT,
    "rom" TEXT,
    "color" TEXT,
    "customerPurchaseProductId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customerPurchaseVariants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customerPurchases" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPurchaseAmounts" INTEGER NOT NULL,
    "totalDue" INTEGER NOT NULL,
    "totalPay" INTEGER NOT NULL,
    "paymentType" TEXT,
    "userId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "sellGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customerPurchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customerPayInUsers" (
    "id" TEXT NOT NULL,
    "payAmount" INTEGER NOT NULL,
    "customerPurchaseId" TEXT NOT NULL,
    "paymentType" TEXT,
    "sellGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customerPayInUsers_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "customerPayments" (
    "id" TEXT NOT NULL,
    "totalPay" DOUBLE PRECISION NOT NULL,
    "totalDue" DOUBLE PRECISION NOT NULL,
    "totalSellPrice" DOUBLE PRECISION NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "paymentType" TEXT,
    "customerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customerPayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vats" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vatType" TEXT NOT NULL,
    "vatValue" DOUBLE PRECISION NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discountType" TEXT NOT NULL,
    "discountValue" DOUBLE PRECISION NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "units" (
    "id" TEXT NOT NULL,
    "unitName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "colorCode" TEXT,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currencyType" (
    "id" TEXT NOT NULL,
    "currencyName" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "currencyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplierSells" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalSellAmounts" DOUBLE PRECISION NOT NULL,
    "totalDue" DOUBLE PRECISION NOT NULL,
    "totalPay" DOUBLE PRECISION NOT NULL,
    "paymentType" TEXT,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "purchaseGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplierSells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplierSellProducts" (
    "id" TEXT NOT NULL,
    "productName" TEXT,
    "brandName" TEXT,
    "modelName" TEXT,
    "processor" TEXT,
    "unit" TEXT,
    "category" TEXT,
    "reOrderAlert" INTEGER,
    "productImage" TEXT,
    "description" TEXT,
    "productStock" INTEGER,
    "othersStock" INTEGER,
    "purchaseGroupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplierSellProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplierSellVariants" (
    "id" TEXT NOT NULL,
    "imeiNumber" TEXT NOT NULL,
    "ram" TEXT,
    "rom" TEXT,
    "color" TEXT,
    "supplierSellProductId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplierSellVariants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchaseGroups" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchaseGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payInSuppliers" (
    "id" TEXT NOT NULL,
    "payAmount" INTEGER NOT NULL,
    "supplierSellId" TEXT NOT NULL,
    "paymentType" TEXT,
    "purchaseGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payInSuppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "additionalExpenses" (
    "id" TEXT NOT NULL,
    "expenseAmount" DOUBLE PRECISION NOT NULL,
    "details" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "additionalExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warranties" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "uniqueId" TEXT NOT NULL,
    "imei" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "purchaseDate" TEXT NOT NULL,
    "issueSubmitDate" TEXT NOT NULL,
    "purchasePlace" TEXT NOT NULL,
    "repairHistory" TEXT NOT NULL,
    "issue" TEXT NOT NULL,
    "repairCount" INTEGER NOT NULL,
    "deliveryTime" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "warranties_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNo_key" ON "users"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "users_uniqueId_key" ON "users"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_email_key" ON "suppliers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_phoneNo_key" ON "suppliers"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_uniqueId_key" ON "suppliers"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "returnGroups_uniqueId_key" ON "returnGroups"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "supplierReturnPayments_returnGroupId_key" ON "supplierReturnPayments"("returnGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "purchases_supplierSellProductId_key" ON "purchases"("supplierSellProductId");

-- CreateIndex
CREATE UNIQUE INDEX "sells_customerPurchaseProductId_key" ON "sells"("customerPurchaseProductId");

-- CreateIndex
CREATE UNIQUE INDEX "sellGroups_uniqueId_key" ON "sellGroups"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "customerPurchases_sellGroupId_key" ON "customerPurchases"("sellGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_phoneNo_key" ON "customers"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "brands_uniqueId_key" ON "brands"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "supplierSells_purchaseGroupId_key" ON "supplierSells"("purchaseGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "purchaseGroups_uniqueId_key" ON "purchaseGroups"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "additionalExpenses_uniqueId_key" ON "additionalExpenses"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "shops_phone_key" ON "shops"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "shops_email_key" ON "shops"("email");

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierPayments" ADD CONSTRAINT "supplierPayments_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierPayments" ADD CONSTRAINT "supplierPayments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "returns" ADD CONSTRAINT "returns_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "returns" ADD CONSTRAINT "returns_userReturnProductsId_fkey" FOREIGN KEY ("userReturnProductsId") REFERENCES "userReturnProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "additionalMoneyBacks" ADD CONSTRAINT "additionalMoneyBacks_returnGroupId_fkey" FOREIGN KEY ("returnGroupId") REFERENCES "returnGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userReturnProducts" ADD CONSTRAINT "userReturnProducts_returnGroupId_fkey" FOREIGN KEY ("returnGroupId") REFERENCES "returnGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierReturnPayments" ADD CONSTRAINT "supplierReturnPayments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierReturnPayments" ADD CONSTRAINT "supplierReturnPayments_returnGroupId_fkey" FOREIGN KEY ("returnGroupId") REFERENCES "returnGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_supplierSellId_fkey" FOREIGN KEY ("supplierSellId") REFERENCES "supplierSells"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_supplierSellProductId_fkey" FOREIGN KEY ("supplierSellProductId") REFERENCES "supplierSellProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sells" ADD CONSTRAINT "sells_customerPurchaseProductId_fkey" FOREIGN KEY ("customerPurchaseProductId") REFERENCES "customerPurchaseProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sells" ADD CONSTRAINT "sells_customerPurchaseVariantId_fkey" FOREIGN KEY ("customerPurchaseVariantId") REFERENCES "customerPurchaseVariants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sells" ADD CONSTRAINT "sells_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sells" ADD CONSTRAINT "sells_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPurchaseProducts" ADD CONSTRAINT "customerPurchaseProducts_sellGroupId_fkey" FOREIGN KEY ("sellGroupId") REFERENCES "sellGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPurchaseVariants" ADD CONSTRAINT "customerPurchaseVariants_customerPurchaseProductId_fkey" FOREIGN KEY ("customerPurchaseProductId") REFERENCES "customerPurchaseProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPurchases" ADD CONSTRAINT "customerPurchases_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPurchases" ADD CONSTRAINT "customerPurchases_sellGroupId_fkey" FOREIGN KEY ("sellGroupId") REFERENCES "sellGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPayInUsers" ADD CONSTRAINT "customerPayInUsers_sellGroupId_fkey" FOREIGN KEY ("sellGroupId") REFERENCES "sellGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPayments" ADD CONSTRAINT "customerPayments_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPayments" ADD CONSTRAINT "customerPayments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierSells" ADD CONSTRAINT "supplierSells_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierSells" ADD CONSTRAINT "supplierSells_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierSells" ADD CONSTRAINT "supplierSells_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierSells" ADD CONSTRAINT "supplierSells_purchaseGroupId_fkey" FOREIGN KEY ("purchaseGroupId") REFERENCES "purchaseGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierSellProducts" ADD CONSTRAINT "supplierSellProducts_purchaseGroupId_fkey" FOREIGN KEY ("purchaseGroupId") REFERENCES "purchaseGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierSellProducts" ADD CONSTRAINT "supplierSellProducts_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierSellVariants" ADD CONSTRAINT "supplierSellVariants_supplierSellProductId_fkey" FOREIGN KEY ("supplierSellProductId") REFERENCES "supplierSellProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payInSuppliers" ADD CONSTRAINT "payInSuppliers_purchaseGroupId_fkey" FOREIGN KEY ("purchaseGroupId") REFERENCES "purchaseGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
