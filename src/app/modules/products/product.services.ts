import { Prisma, Product } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { generateUniqueProductId } from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { productFilterableKey } from './product.constant'
import { IProductFilterRequest } from './product.type'

// Create user
const CreateUserService = async (payload: Product) => {
  const productId = await generateUniqueProductId('p')
  payload.uniqueId = productId

  // @ts-ignore
  payload.productStock = payload.variants?.length || 0

  // Save the product to the database
  const result = await prisma.product.create({ data: payload })
  return result
}

// get all product
const GetAllCreateUserService = async (
  filters: IProductFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Product[]>> => {
  // Filters
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // SearchTerm
  if (searchTerm) {
    andConditions.push({
      OR: productFilterableKey.map(field => ({
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

  // console.log(filters)
  // Pagination
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions)

  // Where condition
  const whereConditions: Prisma.ProductWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.product.findMany({
    where: whereConditions,
    skip,
    take: limit,

    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions.sortBy]: paginationOptions.sortOrder,
          }
        : {
            createdAt: 'desc',
          },

    include: {
      variants: true,
      purchases: true,
    },
  })

  const total = await prisma.product.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}

// get all product
const SingleProductGetService = async (id: string): Promise<Product | null> => {
  const isExist = await prisma.product.findUnique({ where: { id: id } })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid product.')
  }

  const result = await prisma.product.findUnique({
    where: { id: id },
    include: {
      variants: true,
      purchases: true,
    },
  })
  return result
}

// Update product
const UpdateProductGetService = async (
  id: string,
  payloads: Partial<Product>,
): Promise<Product | null> => {
  const isExist = await prisma.product.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid product.')
  }

  const result = await prisma.product.update({
    where: { id: id },
    data: payloads,
  })
  return result
}

export const ProductsService = {
  CreateUserService,
  GetAllCreateUserService,
  SingleProductGetService,
  UpdateProductGetService,
}
