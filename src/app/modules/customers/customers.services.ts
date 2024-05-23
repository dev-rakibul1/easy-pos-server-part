import { Customers } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'
import { generateUniqueCustomerId } from '../../../utilities/uniqueIdGenerator'

// Create customer
const CreateCustomerService = async (payload: Customers) => {
  const customerId = await generateUniqueCustomerId('c')
  payload.uniqueId = customerId

  return prisma.$transaction(async tx => {
    // Check if email already exists
    const existingEmail = await tx.customers.findUnique({
      where: { email: payload.email },
    })

    if (existingEmail) {
      throw new ApiError(httpStatus.CONFLICT, 'Email already exists.')
    }

    // Check if phone number already exists
    const existingPhoneNo = await tx.customers.findUnique({
      where: { phoneNo: payload.phoneNo },
    })

    if (existingPhoneNo) {
      throw new ApiError(httpStatus.CONFLICT, 'Phone number already exists.')
    }

    const result = await tx.customers.create({ data: payload })
    return result
  })
}
// get all customer
const GetAllCustomerService = async () => {
  const result = await prisma.customers.findMany({
    include: {
      purchaseHistory: true,
      payments: true,
    },
  })
  return result
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

export const CustomerService = {
  CreateCustomerService,
  GetAllCustomerService,
  UpdateCustomerService,
}
