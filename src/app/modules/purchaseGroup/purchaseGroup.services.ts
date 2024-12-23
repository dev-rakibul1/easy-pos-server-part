import { PurchaseGroup } from '@prisma/client'
import dayjs from 'dayjs'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'
import { IFilterByStartEndDateType } from '../sell/sell.type'

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
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)

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
        gte: startOfDay,
        lte: endOfDay,
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

  // Start of the current month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  // Date 7 days ago
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  // Ensure we do not go before the start of the month
  const startDate = sevenDaysAgo < startOfMonth ? startOfMonth : sevenDaysAgo

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
        gte: startDate,
        lt: today,
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
// get all purchase group year
const GetAllPurchaseGroupByCurrentYearService = async (): Promise<
  PurchaseGroup[]
> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Date one year ago
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

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
        gte: oneYearAgo,
        lt: today,
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

// purchase group filter by start and end date
const GetAllPurchaseGroupByStartEndDateService = async (
  startDate: string,
  endDate: string,
): Promise<IFilterByStartEndDateType<PurchaseGroup[]>> => {
  console.log(startDate, endDate)
  // Validate date formats
  if (
    !dayjs(startDate, 'YYYY-MM-DD', true).isValid() ||
    !dayjs(endDate, 'YYYY-MM-DD', true).isValid()
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid date format. Use YYYY-MM-DD.',
    )
  }

  const start = dayjs(startDate).toDate()
  const end = dayjs(endDate).endOf('day').toDate()

  // Fetch filtered purchase
  const purchase = await prisma.purchaseGroup.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
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

  const total = purchase.length

  return {
    meta: { total },
    data: purchase,
  }
}

export const PurchaseGroupService = {
  GetAllPurchaseGroupService,
  SinglePurchaseGroupService,
  GetAllPurchaseGroupByCurrentDateService,
  GetAllPurchaseGroupByCurrentWeekService,
  GetAllPurchaseGroupByCurrentMonthService,
  GetAllPurchaseGroupByCurrentYearService,
  GetAllPurchaseGroupByStartEndDateService,
}
