import { Brands, Prisma } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { generateUniqueBrandId } from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IBrandFilterRequest } from './brand.type'

// Create Brand service
const CreateBrandService = async (payloads: Brands): Promise<Brands | null> => {
  const BrandId = await generateUniqueBrandId('bra')
  payloads.uniqueId = BrandId

  const BrandCreate = await prisma.brands.create({ data: payloads })
  return BrandCreate
}

// get all Brand
const GetAllBrandService = async (
  filters: IBrandFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Brands[] | null>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: ['description', 'brandName'].map(field => ({
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
  const whereConditions: Prisma.BrandsWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.brands.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.brands.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}

// get single brand service
const GetSingleBrandService = async (id: string): Promise<Brands> => {
  const isExist = await prisma.brands.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid brand.')
  }

  return isExist
}

// Updated brand service
const UpdateBrandService = async (
  id: string,
  payloads: Partial<Brands>,
): Promise<Partial<Brands>> => {
  const isExist = await prisma.brands.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid brand.')
  }

  const result = await prisma.brands.update({
    where: { id: id },
    data: payloads,
  })
  return result
}

// Delete brand service
const DeleteBrandService = async (id: string): Promise<Brands> => {
  const isExist = await prisma.brands.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid unit.')
  }

  const result = await prisma.brands.delete({ where: { id: id } })
  return result
}

export const BrandService = {
  CreateBrandService,
  GetAllBrandService,
  GetSingleBrandService,
  UpdateBrandService,
  DeleteBrandService,
}
