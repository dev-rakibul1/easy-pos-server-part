import { AdditionalExpenses, Prisma } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { generateUniqueAdditionalExpenseId } from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IAdditionalExpenseFilterRequest } from './additionalExpenseType'

const CreateAdditionalExpensesService = async (
  payload: AdditionalExpenses,
): Promise<AdditionalExpenses | null> => {
  const id = await generateUniqueAdditionalExpenseId('AEI')
  payload.uniqueId = id

  const result = await prisma.additionalExpenses.create({ data: payload })
  return result
}
const CreateAdditionalExpensesGetByCurrentDateService = async (): Promise<
  AdditionalExpenses[] | null
> => {
  // Current date
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)

  const result = await prisma.additionalExpenses.findMany({
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
const CreateAdditionalExpensesGetByCurrentWeekService = async (): Promise<
  AdditionalExpenses[] | null
> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const result = await prisma.additionalExpenses.findMany({
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
const CreateAdditionalExpensesGetByCurrentMonthService = async (): Promise<
  AdditionalExpenses[] | null
> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get the start of the current month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  // Get the start of the next month
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)

  const result = await prisma.additionalExpenses.findMany({
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

const CreateAdditionalExpensesGetByCurrentYearService = async (): Promise<
  AdditionalExpenses[] | null
> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Date one year ago
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  const result = await prisma.additionalExpenses.findMany({
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
const GetAllAdditionalExpensesService = async (
  filters: IAdditionalExpenseFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<AdditionalExpenses[] | null>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: ['details', 'uniqueId'].map(field => ({
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
  const whereConditions: Prisma.AdditionalExpensesWhereInput =
    andConditions.length ? { AND: andConditions } : {}

  const result = await prisma.additionalExpenses.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.additionalExpenses.count()

  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  }
}
const UpdateAdditionalExpensesService = async (
  id: string,
  payloads: Partial<AdditionalExpenses>,
): Promise<AdditionalExpenses | null> => {
  const isExist = await prisma.additionalExpenses.findUnique({
    where: { id: id },
  })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid additional expense.')
  }

  const result = await prisma.additionalExpenses.update({
    where: { id: id },
    data: payloads,
  })
  return result
}
const SingleAdditionalExpensesGetService = async (
  id: string,
): Promise<AdditionalExpenses | null> => {
  const isExist = await prisma.additionalExpenses.findUnique({
    where: { id: id },
  })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid additional expense.')
  }

  return isExist
}
const DeleteAdditionalExpensesService = async (
  id: string,
): Promise<AdditionalExpenses | null> => {
  console.log(id)
  const isExist = await prisma.additionalExpenses.findFirst({
    where: { id: id },
  })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid additional expense.')
  }

  console.log(id)
  const result = await prisma.additionalExpenses.delete({ where: { id: id } })

  return result
}

export const AdditionalExpensesService = {
  CreateAdditionalExpensesService,
  CreateAdditionalExpensesGetByCurrentDateService,
  CreateAdditionalExpensesGetByCurrentWeekService,
  CreateAdditionalExpensesGetByCurrentMonthService,
  CreateAdditionalExpensesGetByCurrentYearService,
  GetAllAdditionalExpensesService,
  UpdateAdditionalExpensesService,
  SingleAdditionalExpensesGetService,
  DeleteAdditionalExpensesService,
}
