import { Prisma, Units } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IUnitFilterRequest } from './unit.type'

// Create Unit service
const CreateUnitService = async (payloads: Units): Promise<Units> => {
  const UnitCreate = await prisma.units.create({ data: payloads })
  return UnitCreate
}

// get all Unit
const GetAllUnitService = async (
  filters: IUnitFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Units[]>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: ['unitName'].map(field => ({
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
  const whereConditions: Prisma.UnitsWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.units.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.units.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}

// Create Unit service
const GetSingleUnitService = async (id: string): Promise<Units> => {
  const isExist = await prisma.units.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid unit.')
  }

  return isExist
}

// Create Unit service
const UpdateUnitService = async (
  id: string,
  payloads: Units,
): Promise<Units> => {
  const isExist = await prisma.units.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid unit.')
  }

  const result = await prisma.units.update({
    where: { id: id },
    data: payloads,
  })
  return result
}
// Delete Unit service
const DeleteUnitService = async (id: string): Promise<Units> => {
  const isExist = await prisma.units.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid unit.')
  }

  const result = await prisma.units.delete({ where: { id: id } })
  return result
}

export const UnitService = {
  CreateUnitService,
  GetAllUnitService,
  UpdateUnitService,
  DeleteUnitService,
  GetSingleUnitService,
}
