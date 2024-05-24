import { Prisma, Variants } from '@prisma/client'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IVariantFilterRequest } from './variants.type'

// Create user
const CreateVariantService = async (payload: Variants) => {
  const result = await prisma.variants.create({ data: payload })
  return result
}

// get all user
const GetAllCreateVariantService = async (
  filters: IVariantFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Variants[]>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // SearchTerm
  if (searchTerm) {
    andConditions.push({
      OR: ['imeiNumber', 'ram', 'rom', 'color'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  // Filter data
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
  const whereConditions: Prisma.VariantsWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.variants.findMany({
    where: whereConditions,
    skip,
    take: limit,

    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },

    include: {
      product: true,
    },
  })

  const total = await prisma.variants.count()
  return {
    meta: { limit, page, total },
    data: result,
  }
}

// get all user
const DeleteSingleVariantService = async (id: string) => {
  const result = await prisma.variants.delete({ where: { id: id } })
  return result
}

export const VariantService = {
  CreateVariantService,
  GetAllCreateVariantService,
  DeleteSingleVariantService,
}
