import { SupplierSell } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'

// Create supplier sell service
const CreateSupplierSellsService = async (payloads: SupplierSell[]) => {
  try {
    const createdSupplierSells = await prisma.supplierSell.createMany({
      data: payloads,
    })

    // 01950505981

    return createdSupplierSells
  } catch (error) {
    console.error('Error creating supplier sells:', error)
    throw error // Rethrow the error for the caller to handle
  }
}

// get all supplier sells
const GetAllSupplierSellsService = async (): Promise<SupplierSell[]> => {
  const result = await prisma.supplierSell.findMany({
    include: {
      supplier: true,
      user: true,
      purchase: true,
      product: {
        include: {
          supplierSells: true,
          variants: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return result
}
// Get Supplier Sell By Supplier And User Service
const GetSupplierSellBySupplierAndUserService = async (
  ids: any,
): Promise<SupplierSell[]> => {
  try {
    const obj = ids
    const [supplierId, userId] = obj.id.split(',')

    const result = await prisma.supplierSell.findMany({
      where: { supplierId: supplierId, userId: userId },
      include: {
        supplier: true,
        user: true,
        product: {
          include: {
            supplierSells: true,
            variants: true,
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
// Get Supplier Sell By Supplier And User Service
const GetSingleSupplierSellService = async (
  id: string,
): Promise<SupplierSell | null> => {
  const result = await prisma.supplierSell.findUnique({
    where: { id },
    include: {
      supplier: true,
      user: true,
      product: {
        include: {
          supplierSells: true,
          variants: true,
        },
      },
    },
  })

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid supplier sells')
  }
  return result
}

export const SupplierSellsService = {
  CreateSupplierSellsService,
  GetAllSupplierSellsService,
  GetSupplierSellBySupplierAndUserService,
  GetSingleSupplierSellService,
}
