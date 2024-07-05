import { Prisma, Suppliers } from '@prisma/client'
import { Request } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { generateUniqueSupplierId } from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { supplierFilterableKey } from './supplier.constant'
import { ISupplierFilterRequest } from './supplier.type'

// Create supplier
const CreateSupplierService = async (req: Request) => {
  const payloads: Suppliers = req.body

  const supplierId = await generateUniqueSupplierId('S')
  payloads.uniqueId = supplierId

  const filePath = `/${req.file?.destination}${req.file?.originalname}`
  if (filePath) {
    payloads.profileImage = filePath
  }

  return prisma.$transaction(async tx => {
    const existingEmail = await tx.suppliers.findUnique({
      where: { email: payloads.email },
    })

    if (existingEmail) {
      throw new ApiError(httpStatus.CONFLICT, 'Email already exists.')
    }

    // Check if phone number already exists
    const existingPhoneNo = await tx.suppliers.findUnique({
      where: { phoneNo: payloads.phoneNo },
    })

    if (existingPhoneNo) {
      throw new ApiError(httpStatus.CONFLICT, 'Phone number already exists.')
    }

    const result = await tx.suppliers.create({ data: payloads })
    return result
  })
}

// get all supplier
const GetAllSupplierUserService = async (
  filters: ISupplierFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Suppliers[]>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // SearchTerms
  if (searchTerm) {
    andConditions.push({
      OR: supplierFilterableKey.map(filed => ({
        [filed]: {
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

  // Where conditions
  const whereConditions: Prisma.SuppliersWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  // pagination
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const result = await prisma.suppliers.findMany({
    where: whereConditions,

    skip,
    take: limit,

    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },

    include: {
      payments: true,
      purchase: true,
      supplierSell: true,
      supplierSellProducts: true,
      returnHistory: true,
    },
  })

  const total = await prisma.suppliers.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}

// Update supplier
const UpdateSupplierUserService = async (
  id: string,
  payloads: Partial<Suppliers>,
) => {
  // Find the existing supplier
  const isExist = await prisma.suppliers.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid supplier.')
  }

  // Check if email is being updated and if it already exists
  if (payloads?.email && payloads.email !== isExist.email) {
    const existingEmail = await prisma.suppliers.findFirst({
      where: { email: payloads.email },
    })
    if (existingEmail) {
      throw new ApiError(httpStatus.CONFLICT, 'Email already exists.')
    }
  }

  // Check if phone number is being updated and if it already exists
  if (payloads?.phoneNo && payloads.phoneNo !== isExist.phoneNo) {
    const existingPhoneNo = await prisma.suppliers.findFirst({
      where: { phoneNo: payloads.phoneNo },
      include: {
        payments: true,
        purchase: true,
        supplierSell: true,
        supplierSellProducts: true,
        returnHistory: true,
      },
    })
    if (existingPhoneNo) {
      throw new ApiError(httpStatus.CONFLICT, 'Phone number already exists.')
    }
  }

  // Update the supplier within a transaction
  const result = await prisma.$transaction(async tx => {
    const updatedSupplier = await tx.suppliers.update({
      where: { id: id },
      data: payloads,
    })
    return updatedSupplier
  })

  return result
}
// Update supplier
const GetSingleSupplierService = async (id: string) => {
  // Find the existing supplier
  const isExist = await prisma.suppliers.findUnique({
    where: { id: id },
    include: {
      payments: true,
      purchase: true,
      supplierSell: true,
      supplierSellProducts: true,
      returnHistory: true,
    },
  })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid supplier.')
  }
  return isExist
}

// Supplier filter by supplier, user and product
const GetSuppliersByUserSupplierProductService = async (ids: any) => {
  try {
    const [userId, productId] = ids.id.split(',')

    const result = await prisma.suppliers.findMany({
      where: {
        purchase: {
          some: {
            userId: userId,
            productId: productId,
          },
        },
      },
    })

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const SupplierService = {
  CreateSupplierService,
  GetAllSupplierUserService,
  UpdateSupplierUserService,
  GetSingleSupplierService,
  GetSuppliersByUserSupplierProductService,
}
