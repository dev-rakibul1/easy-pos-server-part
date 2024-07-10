import { Prisma, ReturnGroups } from '@prisma/client'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
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
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const result = await prisma.returnGroups.findMany({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow,
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

export const ReturnGroupService = {
  GetAllReturnGroupService,
  SingleReturnGroupService,
  GetReturnGroupByCurrentDateService,
}
