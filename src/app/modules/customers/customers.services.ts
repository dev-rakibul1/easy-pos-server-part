import { Customers, Prisma } from '@prisma/client'
import { Request } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { generateUniqueCustomerId } from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { ICustomerFilterRequest } from './customer.type'
import { customerFilterAbleKey } from './customers.constant'

// Create customer
const CreateCustomerService = async (req: Request) => {
  const payloads: Customers = req.body
  const customerId = await generateUniqueCustomerId('c')
  payloads.uniqueId = customerId

  // Image setup
  const filePath = `/${req.file?.destination}${req.file?.originalname}`
  if (filePath) {
    payloads.profileImage = filePath
  }

  return prisma.$transaction(async tx => {
    // Check if email already exists
    const existingEmail = await tx.customers.findUnique({
      where: { email: payloads.email },
    })

    if (existingEmail) {
      throw new ApiError(httpStatus.CONFLICT, 'Email already exists.')
    }

    // Check if phone number already exists
    const existingPhoneNo = await tx.customers.findUnique({
      where: { phoneNo: payloads.phoneNo },
    })

    if (existingPhoneNo) {
      throw new ApiError(httpStatus.CONFLICT, 'Phone number already exists.')
    }

    const result = await tx.customers.create({ data: payloads })
    return result
  })
}
// get all customer
const GetAllCustomerService = async (
  filters: ICustomerFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Customers[]>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // SearchTerms
  if (searchTerm) {
    andConditions.push({
      OR: customerFilterAbleKey.map(filed => ({
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
  const whereConditions: Prisma.CustomersWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  // Pagination
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const result = await prisma.customers.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
    include: {
      purchaseHistory: true,
      payments: true,
    },
  })

  const total = await prisma.customers.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}
//  customer updated
const UpdateCustomerService = async (id: string, payloads: Customers) => {
  const isExist = await prisma.customers.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid customer.')
  }

  return prisma.$transaction(async tx => {
    // Check if email already exists
    const existingEmail = await tx.customers.findUnique({
      where: { email: payloads.email },
    })

    if (existingEmail) {
      throw new ApiError(httpStatus.CONFLICT, 'Email already exists.')
    }

    // Check if phone number already exists
    const existingPhoneNo = await tx.customers.findUnique({
      where: { phoneNo: payloads.phoneNo },
    })

    if (existingPhoneNo) {
      throw new ApiError(httpStatus.CONFLICT, 'Phone number already exists.')
    }

    const result = await prisma.customers.update({
      where: { id: id },
      data: payloads,
    })
    return result
  })
}
//  customer updated
const GetSingleCustomerService = async (id: string) => {
  const isExist = await prisma.customers.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid customer.')
  }
  return isExist
}

export const CustomerService = {
  CreateCustomerService,
  GetAllCustomerService,
  UpdateCustomerService,
  GetSingleCustomerService,
}
