import { Prisma, Vats } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { generateUniqueVatId } from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IVatsFilterRequest } from './vats.type'

// Create Vat service
const CreateVatService = async (payloads: Vats) => {
  const VatId = await generateUniqueVatId('vat')
  payloads.uniqueId = VatId
  const VatCreate = await prisma.vats.create({ data: payloads })
  return VatCreate
}

// get all Vat
const GetAllVatService = async (
  filters: IVatsFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Vats[]>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: ['name', 'vatType'].map(field => ({
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
  const whereConditions: Prisma.VatsWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.vats.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.vats.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}
// get all Vat
const UpdateVatService = async (
  id: string,
  payloads: Partial<Vats>,
): Promise<Partial<Vats>> => {
  const isExist = await prisma.vats.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid vats.')
  }

  const result = await prisma.vats.update({
    where: { id: id },
    data: payloads,
  })
  return result
}

// get single Vat
const GetSingleVatService = async (id: string): Promise<Partial<Vats>> => {
  const isExist = await prisma.vats.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid vats.')
  }
  return isExist
}

// delete Vat
const DeleteVatService = async (id: string): Promise<Partial<Vats>> => {
  const isExist = await prisma.vats.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid vats.')
  }

  const result = await prisma.vats.delete({
    where: { id: id },
  })
  return result
}

export const VatService = {
  CreateVatService,
  GetAllVatService,
  UpdateVatService,
  GetSingleVatService,
  DeleteVatService,
}
