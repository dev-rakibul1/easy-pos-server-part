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
      createdAt: 'desc',
    },
  })
  return result
}
// get all purchase group week
const GetAllPurchaseGroupByCurrentWeekService = async (): Promise<
  PurchaseGroup[]
> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get the start of the current week (Monday)
  const startOfWeek = new Date(today)
  const dayOfWeek = startOfWeek.getDay()
  const diffToMonday = (dayOfWeek + 6) % 7
  startOfWeek.setDate(startOfWeek.getDate() - diffToMonday)

  // Get the end of the current week (Sunday)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 7)

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
        gte: startOfWeek,
        lt: endOfWeek,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return result
}
// get all purchase group week
const GetAllPurchaseGroupByCurrentMonthService = async (): Promise<
  PurchaseGroup[]
> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get the start of the current month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  // Get the start of the next month
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
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
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
    orderBy: {
      createdAt: 'desc',
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
  GetAllPurchaseGroupByCurrentWeekService,
  GetAllPurchaseGroupByCurrentMonthService,
}
