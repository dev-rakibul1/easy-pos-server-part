import { PurchaseGroup } from '@prisma/client'
import prisma from '../../../shared/prisma'

// get all purchase group
const GetAllPurchaseGroupService = async (): Promise<PurchaseGroup[]> => {
  const result = await prisma.purchaseGroup.findMany({
    include: {
      supplierSellProducts: {
        include: {
          variants: true,
          purchase: true,
        },
      },
      supplierSells: true,
      payInSupplier: true,
    },
  })
  return result
}

// get all purchase group
const GetAllPurchaseGroupByCurrentDateService = async (): Promise<
  PurchaseGroup[]
> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const result = await prisma.purchaseGroup.findMany({
    include: {
      supplierSellProducts: {
        include: {
          variants: true,
          purchase: true,
        },
      },
      supplierSells: true,
      payInSupplier: true,
    },

    where: {
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  return result
}
// get single group by supplier sells id
const SinglePurchaseGroupService = async (
  id: string,
): Promise<PurchaseGroup | null> => {
  const result = await prisma.purchaseGroup.findFirst({
    where: { supplierSells: { id: id } },
    include: {
      supplierSellProducts: {
        include: {
          variants: true,
          purchase: true,
        },
      },
      supplierSells: true,
      payInSupplier: true,
    },
  })
  return result
}

export const PurchaseGroupService = {
  GetAllPurchaseGroupService,
  SinglePurchaseGroupService,
  GetAllPurchaseGroupByCurrentDateService,
}
