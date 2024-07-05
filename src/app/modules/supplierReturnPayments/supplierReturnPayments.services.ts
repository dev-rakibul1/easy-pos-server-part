import { SupplierReturnPayments } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'

// Get Supplier Sell By Supplier And User Service
const GetSupplierReturnPaymentByUserAndSupplierService = async (
  ids: any,
): Promise<SupplierReturnPayments[]> => {
  try {
    const obj = ids
    const [userId] = obj.id.split(',')

    const result = await prisma.supplierReturnPayments.findMany({
      where: { userId: userId },
    })

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}
// Get Supplier Sell By Supplier And User Service
const GetSingleSupplierReturnPaymentService = async (
  id: string,
): Promise<SupplierReturnPayments | null> => {
  const result = await prisma.supplierReturnPayments.findUnique({
    where: { id },
    include: {
      user: true,
    },
  })

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid customer purchase')
  }
  return result
}

export const SupplierReturnPaymentService = {
  GetSupplierReturnPaymentByUserAndSupplierService,
  GetSingleSupplierReturnPaymentService,
}
