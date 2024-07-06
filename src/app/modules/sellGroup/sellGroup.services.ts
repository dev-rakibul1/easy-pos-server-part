import { Prisma, SellGroups } from '@prisma/client'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
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
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  // Where condition including date range
  const whereConditions: Prisma.SellGroupsWhereInput = {
    AND: [
      ...andConditions,
      {
        createdAt: {
          gte: today,
          lt: tomorrow,
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

export const SellGroupService = {
  GetAllSellGroupService,
  SingleSellGroupService,
  GetSellGroupByCurrentDateService,
}
