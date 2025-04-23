-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('active', 'suspended', 'banned');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('active', 'suspended', 'banned');

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "billingAddress" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "deviceTokens" TEXT[],
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "ipHistory" TEXT[],
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "lastPurchaseDate" TIMESTAMP(3),
ADD COLUMN     "loyaltyPoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "newsletterOptIn" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "providerId" TEXT,
ADD COLUMN     "referralCode" TEXT,
ADD COLUMN     "referredBy" TEXT,
ADD COLUMN     "shippingAddress" TEXT,
ADD COLUMN     "status" "CustomerStatus" NOT NULL DEFAULT 'active',
ADD COLUMN     "userAgentHistory" TEXT[];
