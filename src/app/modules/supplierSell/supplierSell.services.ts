import { SupplierSell } from '@prisma/client'
import prisma from '../../../shared/prisma'

// Create supplier sell service
const CreateSupplierSellsService = async (payloads: SupplierSell[]) => {
  try {
    const createdSupplierSells = await prisma.supplierSell.createMany({
      data: payloads,
    })

    return createdSupplierSells
  } catch (error) {
    console.error('Error creating supplier sells:', error)
    throw error // Rethrow the error for the caller to handle
  }
}

// get all supplier sells
const GetAllSupplierSellsService = async (): Promise<SupplierSell[]> => {
  const result = await prisma.supplierSell.findMany({})
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
    })

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const SupplierSellsService = {
  CreateSupplierSellsService,
  GetAllSupplierSellsService,
  GetSupplierSellBySupplierAndUserService,
}
