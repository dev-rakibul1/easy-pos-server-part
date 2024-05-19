import { SupplierPayment } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { generateUniqueSupplierPaymentId } from '../../../utilities/uniqueIdGenerator'

// Create user
const CreateSupplierPaymentService = async (payload: SupplierPayment) => {
  const supplierPaymentId = await generateUniqueSupplierPaymentId('spd')
  payload.uniqueId = supplierPaymentId
  console.log(payload)

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

export const SupplierPaymentService = {
  CreateSupplierPaymentService,
  GetAllSupplierPaymentService,
}
