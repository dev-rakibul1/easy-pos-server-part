import { Prisma, ReturnGroups } from '@prisma/client'
import dayjs from 'dayjs'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IFilterByStartEndDateType } from '../sell/sell.type'
import { IReturnGroupFilterRequest } from './returnGroup.type'

// get all Return group
const GetAllReturnGroupService = async (
  filters: IReturnGroupFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ReturnGroups[]>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: ['uniqueId', 'userId', 'supplierId'].map(field => ({
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
  const whereConditions: Prisma.ReturnGroupsWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.returnGroups.findMany({
    where: whereConditions,
    skip,
    take: limit,
    include: {
      supplierReturnPayments: {
        include: {
          user: true,
        },
      },
      userReturnProducts: {
        include: {
          returns: true,
        },
      },
    },
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.returnGroups.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}
// get single group by supplier sells id
const SingleReturnGroupService = async (id: string) => {
  const result = await prisma.returnGroups.findFirst({
    where: { supplierReturnPayments: { id: id } },
    include: {
      supplierReturnPayments: {
        include: {
          user: true,
        },
      },
      userReturnProducts: {
        include: {
          returns: true,
        },
      },
      additionalMoneyBack: true,
    },
  })
  return result
}

// get return group by current date
const GetReturnGroupByCurrentDateService = async () => {
  // Current date
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)

  const result = await prisma.returnGroups.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      supplierReturnPayments: {
        include: {
          user: true,
        },
      },
      userReturnProducts: {
        include: {
          returns: true,
        },
      },
      additionalMoneyBack: true,
    },
  })
  return result
}
// get return group by current week
const GetReturnGroupByCurrentWeekService = async () => {
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

  const result = await prisma.returnGroups.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lt: today,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      supplierReturnPayments: {
        include: {
          user: true,
        },
      },
      userReturnProducts: {
        include: {
          returns: true,
        },
      },
      additionalMoneyBack: true,
    },
  })
  return result
}
// get return group by current week
const GetReturnGroupByCurrentMonthService = async () => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get the start of the current month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  // Get the start of the next month
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)

  const result = await prisma.returnGroups.findMany({
    where: {
      createdAt: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      supplierReturnPayments: {
        include: {
          user: true,
        },
      },
      userReturnProducts: {
        include: {
          returns: true,
        },
      },
      additionalMoneyBack: true,
    },
  })
  return result
}
// get return group by current week
const GetReturnGroupByCurrentYearService = async () => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Date one year ago
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  const result = await prisma.returnGroups.findMany({
    where: {
      createdAt: {
        gte: oneYearAgo,
        lt: today,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      supplierReturnPayments: {
        include: {
          user: true,
        },
      },
      userReturnProducts: {
        include: {
          returns: true,
        },
      },
      additionalMoneyBack: true,
    },
  })
  return result
}

// Sales group filter by start and end date
const ReturnGroupFilterByStartEndDateService = async (
  startDate: string,
  endDate: string,
): Promise<IFilterByStartEndDateType<ReturnGroups[]>> => {
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
  const returnData = await prisma.returnGroups.findMany({
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
      supplierReturnPayments: {
        include: {
          user: true,
        },
      },
      userReturnProducts: {
        include: {
          returns: true,
        },
      },
      additionalMoneyBack: true,
    },
  })

  const total = returnData.length

  return {
    meta: { total },
    data: returnData,
  }
}

export const ReturnGroupService = {
  GetAllReturnGroupService,
  SingleReturnGroupService,
  GetReturnGroupByCurrentDateService,
  GetReturnGroupByCurrentWeekService,
  GetReturnGroupByCurrentMonthService,
  GetReturnGroupByCurrentYearService,
  ReturnGroupFilterByStartEndDateService,
}
