import { Discounts, Prisma } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { generateUniqueDiscountId } from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IDiscountFilterRequest } from './discount.type'

// Create discount
const CreateDiscountService = async (payloads: Discounts) => {
  const DiscountId = await generateUniqueDiscountId('d')
  payloads.uniqueId = DiscountId
  const DiscountCreate = await prisma.discounts.create({ data: payloads })
  return DiscountCreate
}

// get all discount
const GetAllDiscountService = async (
  filters: IDiscountFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Discounts[] | null>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: ['name', 'discountType'].map(field => ({
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
  const whereConditions: Prisma.DiscountsWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.discounts.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.discounts.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}

// Update discount
const UpdateDiscountService = async (
  id: string,
  payloads: Partial<Discounts>,
): Promise<Partial<Discounts>> => {
  const isExist = await prisma.discounts.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid discount.')
  }

  const result = await prisma.discounts.update({
    where: { id: id },
    data: payloads,
  })
  return result
}
// get single discount
const GetSingleDiscountService = async (
  id: string,
): Promise<Partial<Discounts>> => {
  const isExist = await prisma.discounts.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid discount.')
  }

  return isExist
}
// delete discount
const DeleteDiscountService = async (
  id: string,
): Promise<Partial<Discounts>> => {
  const isExist = await prisma.discounts.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid discount.')
  }

  const result = await prisma.discounts.delete({
    where: { id: id },
  })
  return result
}

export const DiscountService = {
  CreateDiscountService,
  GetAllDiscountService,
  UpdateDiscountService,
  GetSingleDiscountService,
  DeleteDiscountService,
}
