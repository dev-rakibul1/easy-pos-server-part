import { Prisma, SellGroups } from '@prisma/client'
import dayjs from 'dayjs'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IFilterByStartEndDateType } from '../sell/sell.type'
import { ISellFilterRequest } from './sellGroup.type'

// get all sell group
const GetAllSellGroupService = async (
  filters: ISellFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<SellGroups[]>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: ['uniqueId', 'userId', 'customerId'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  // Filters
  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  // Pagination
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  // Where condition
  const whereConditions: Prisma.SellGroupsWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.sellGroups.findMany({
    where: whereConditions,
    skip,
    take: limit,
    include: {
      customerPurchaseProducts: {
        include: {
          variants: true,
          sell: true,
        },
      },
      customerPurchase: {
        include: {
          customer: true,
        },
      },
      customerPayInUser: true,
    },
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.sellGroups.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}
// get all sell group by current date
const GetSellGroupByCurrentDateService = async (
  filters: ISellFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<SellGroups[]>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: ['uniqueId', 'userId', 'customerId'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  // Filters
  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  // Pagination
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  // Current date
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)

  // Where condition including date range
  const whereConditions: Prisma.SellGroupsWhereInput = {
    AND: [
      ...andConditions,
      {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    ],
  }

  const result = await prisma.sellGroups.findMany({
    where: whereConditions,
    skip,
    take: limit,
    include: {
      customerPurchaseProducts: {
        include: {
          variants: true,
          sell: true,
        },
      },
      customerPurchase: {
        include: {
          customer: true,
        },
      },
      customerPayInUser: true,
    },
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.sellGroups.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}
// get all sell group by current week
const GetSellGroupByCurrentWeekService = async (): Promise<SellGroups[]> => {
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

  const result = await prisma.sellGroups.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lt: today,
      },
    },

    include: {
      customerPurchaseProducts: {
        include: {
          variants: true,
          sell: true,
        },
      },
      customerPurchase: {
        include: {
          customer: true,
        },
      },
      customerPayInUser: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return result
}
// get all sell group by current month
const GetSellGroupByCurrentMonthService = async (): Promise<SellGroups[]> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get the start of the current month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  // Get the start of the next month
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)

  const result = await prisma.sellGroups.findMany({
    where: {
      createdAt: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },

    include: {
      customerPurchaseProducts: {
        include: {
          variants: true,
          sell: true,
        },
      },
      customerPurchase: {
        include: {
          customer: true,
        },
      },
      customerPayInUser: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return result
}
// get all sell group by current year
const GetSellGroupByCurrentYearService = async (): Promise<SellGroups[]> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Date one year ago
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  const result = await prisma.sellGroups.findMany({
    where: {
      createdAt: {
        gte: oneYearAgo,
        lt: today,
      },
    },

    include: {
      customerPurchaseProducts: {
        include: {
          variants: true,
          sell: true,
        },
      },
      customerPurchase: {
        include: {
          customer: true,
        },
      },
      customerPayInUser: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return result
}
// get single group by customer sells id
const SingleSellGroupService = async (
  id: string,
): Promise<SellGroups | null> => {
  const result = await prisma.sellGroups.findFirst({
    where: { customerPurchase: { id: id } },
    include: {
      customerPurchaseProducts: {
        include: {
          variants: true,
          sell: true,
        },
      },
      customerPurchase: true,
      customerPayInUser: true,
    },
  })
  return result
}
// get single group by customer sells id
const SingleSellGroupGetByOwnIdService = async (
  id: string,
): Promise<SellGroups | null> => {
  const result = await prisma.sellGroups.findFirst({
    where: { id: id },
    include: {
      customerPurchaseProducts: {
        include: {
          variants: true,
          sell: true,
        },
      },
      customerPurchase: true,
      customerPayInUser: true,
    },
  })
  return result
}

// Sales group filter by start and end date
const SalesGroupFilterByStartEndDateService = async (
  startDate: string,
  endDate: string,
): Promise<IFilterByStartEndDateType<SellGroups[]>> => {
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

  // Fetch filtered sales
  const sales = await prisma.sellGroups.findMany({
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
      customerPurchaseProducts: {
        include: {
          variants: true,
          sell: true,
        },
      },
      customerPurchase: true,
      customerPayInUser: true,
    },
  })

  const total = sales.length

  return {
    meta: { total },
    data: sales,
  }
}

export const SellGroupService = {
  GetAllSellGroupService,
  SingleSellGroupService,
  GetSellGroupByCurrentDateService,
  GetSellGroupByCurrentWeekService,
  GetSellGroupByCurrentMonthService,
  GetSellGroupByCurrentYearService,
  SingleSellGroupGetByOwnIdService,
  SalesGroupFilterByStartEndDateService,
}
