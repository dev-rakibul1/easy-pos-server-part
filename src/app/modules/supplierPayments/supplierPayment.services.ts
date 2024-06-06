import { SupplierPayment } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { generateUniqueSupplierPaymentId } from '../../../utilities/uniqueIdGenerator'

// Create user
const CreateSupplierPaymentService = async (payload: SupplierPayment) => {
  const supplierPaymentId = await generateUniqueSupplierPaymentId('spd')
  payload.uniqueId = supplierPaymentId

  const result = await prisma.supplierPayment.create({ data: payload })
  return result
}

// get all user
const GetAllSupplierPaymentService = async () => {
  const result = await prisma.supplierPayment.findMany({
    include: {
      supplier: true,
      user: true,
    },
  })
  return result
}
// Supplier And User Trans
const SupplierAndUserTransSupplierPaymentService = async (ids: any) => {
  try {
    const obj = ids
    const [supplierId, userId] = obj.id.split(',')

    const result = await prisma.supplierPayment.findFirst({
      where: { supplierId: supplierId, userId: userId },
    })

    return result
  } catch (error) {
    console.error('Error retrieving supplier amount:', error)
    throw error // Rethrow the error to propagate it up the call stack
  }
}

export const SupplierPaymentService = {
  CreateSupplierPaymentService,
  GetAllSupplierPaymentService,
  SupplierAndUserTransSupplierPaymentService,
}
