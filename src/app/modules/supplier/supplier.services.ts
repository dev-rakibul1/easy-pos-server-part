import { Suppliers } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'
import { generateUniqueSupplierId } from '../../../utilities/uniqueIdGenerator'

// Create supplier
const CreateSupplierService = async (payloads: Suppliers) => {
  const supplierId = await generateUniqueSupplierId('S')
  payloads.uniqueId = supplierId

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
const GetAllSupplierUserService = async () => {
  const result = await prisma.suppliers.findMany({
    include: {
      payments: true,
      purchase: true,
      returnHistory: true,
    },
  })
  return result
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

export const SupplierService = {
  CreateSupplierService,
  GetAllSupplierUserService,
  UpdateSupplierUserService,
}
