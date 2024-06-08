import { Colors, Prisma } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { generateUniqueColorId } from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IColorFilterRequest } from './color.type'

// Create color service
const CreateColorService = async (payloads: Colors): Promise<Colors | null> => {
  const colorId = await generateUniqueColorId('col')
  payloads.uniqueId = colorId

  const colorCreate = await prisma.colors.create({ data: payloads })
  return colorCreate
}

// get all color
const GetAllColorService = async (
  filters: IColorFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Colors[] | null>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: ['name', 'colorCode'].map(field => ({
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
  const whereConditions: Prisma.ColorsWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.colors.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.colors.count()

  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  }
}

// Update color
const UpdateColorService = async (
  id: string,
  payloads: Partial<Colors>,
): Promise<Colors | null> => {
  const isExist = await prisma.colors.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid color.')
  }

  const result = await prisma.colors.update({
    where: { id: id },
    data: payloads,
  })
  return result
}
// delete color
const DeleteColorService = async (id: string): Promise<Colors | null> => {
  const isExist = await prisma.colors.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid color.')
  }

  const result = await prisma.colors.delete({
    where: { id: id },
  })
  return result
}
// get single color
const GetSingleColorService = async (id: string): Promise<Colors | null> => {
  const isExist = await prisma.colors.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid color.')
  }

  return isExist
}

export const ColorService = {
  CreateColorService,
  GetAllColorService,
  UpdateColorService,
  DeleteColorService,
  GetSingleColorService,
}
