import { SupplierSellVariants } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'

// Create Unit service
const GetManyBySupplierSellVariantsIdServices = async (
  id: string,
): Promise<SupplierSellVariants[]> => {
  const getSupplierSellVariants = await prisma.supplierSellVariants.findMany({
    // where: { supplierSellId: id },
  })
  if (!getSupplierSellVariants) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid supplier sell variants')
  }
  return getSupplierSellVariants
}

export const SupplierSellVariantsServices = {
  GetManyBySupplierSellVariantsIdServices,
}
