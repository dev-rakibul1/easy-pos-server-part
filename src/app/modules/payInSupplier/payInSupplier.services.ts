import { PayInSupplier } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'

const CreatePayInSupplierService = async (payloads: PayInSupplier) => {
  const isExistSupplierSell = await prisma.supplierSell.findFirst({
    where: { id: payloads.supplierSellId },
  })

  if (!isExistSupplierSell) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid sell')
  }

  return prisma.$transaction(async tx => {
    const result = await tx.payInSupplier.create({ data: payloads })

    // Calculate new totalPay
    const newTotalPay = isExistSupplierSell.totalPay + payloads.payAmount
    const newTotalDue = isExistSupplierSell.totalDue - payloads.payAmount

    // Update totalPay in supplierSell
    await tx.supplierSell.update({
      where: { id: payloads.supplierSellId },
      data: {
        totalPay: newTotalPay,
        totalDue: newTotalDue,
      },
    })

    return result
  })
}

export const PayInSupplierService = {
  CreatePayInSupplierService,
}
