import { Categorys, Prisma } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { ICategoryFilterRequest } from './category.type'

// Create Category service
const CreateCategoryService = async (
  payloads: Categorys,
): Promise<Categorys | null> => {
  const CategoryCreate = await prisma.categorys.create({ data: payloads })
  return CategoryCreate
}

// get all Category
const GetAllCategoryService = async (
  filters: ICategoryFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Categorys[] | null>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: ['categoryName'].map(field => ({
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
  const whereConditions: Prisma.CategorysWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.categorys.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.categorys.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}

// get single category service
const GetSingleCategoryService = async (id: string): Promise<Categorys> => {
  const isExist = await prisma.categorys.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid Category.')
  }

  return isExist
}

// Updated Category service
const UpdateCategoryService = async (
  id: string,
  payloads: Partial<Categorys>,
): Promise<Partial<Categorys>> => {
  const isExist = await prisma.categorys.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid Category.')
  }

  const result = await prisma.categorys.update({
    where: { id: id },
    data: payloads,
  })
  return result
}

// Delete Category service
const DeleteCategoryService = async (id: string): Promise<Categorys> => {
  const isExist = await prisma.categorys.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid category.')
  }

  const result = await prisma.categorys.delete({ where: { id: id } })
  return result
}

export const CategoryService = {
  CreateCategoryService,
  GetAllCategoryService,
  GetSingleCategoryService,
  DeleteCategoryService,
  UpdateCategoryService,
}
