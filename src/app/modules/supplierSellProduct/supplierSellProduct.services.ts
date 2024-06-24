import { SupplierSellProduct } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'

// Create get supplier sell product service
const GetAllSupplierSellProductService = async (): Promise<
  SupplierSellProduct[]
> => {
  const result = await prisma.supplierSellProduct.findMany({
    include: {
      variants: true,
      _count: true,
    },
  })
  return result
}
// get by user and supplier service
const GetByUserAndSupplierService = async (
  ids: any,
): Promise<SupplierSellProduct[]> => {
  try {
    const obj = ids
    const [supplierId, userId] = obj.id.split(',')

    const result = await prisma.supplierSellProduct.findMany({
      where: { supplierId: supplierId, userId: userId },
      include: {
        variants: true,
        _count: true,
      },
    })

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}
const GetSingleSupplierSellProductService = async (
  id: string,
): Promise<SupplierSellProduct | null> => {
  const result = await prisma.supplierSellProduct.findFirst({
    where: { id },
    include: {
      variants: true,
      _count: true,
    },
  })

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid supplier sell product')
  }
  return result
}

export const SupplierSellProductService = {
  GetAllSupplierSellProductService,
  GetByUserAndSupplierService,
  GetSingleSupplierSellProductService,
}
