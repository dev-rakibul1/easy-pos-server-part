import { Suppliers } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { generateUniqueSupplierId } from '../../../utilities/uniqueIdGenerator'

// Create supplier
const CreateSupplierService = async (payload: Suppliers) => {
  const supplierId = await generateUniqueSupplierId('S')
  payload.uniqueId = supplierId

  const result = await prisma.suppliers.create({ data: payload })
  return result
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

export const SupplierService = {
  CreateSupplierService,
  GetAllSupplierUserService,
}
