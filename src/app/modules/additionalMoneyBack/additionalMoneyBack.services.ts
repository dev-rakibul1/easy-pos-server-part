import { AdditionalMoneyBack } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'

const CreateAdditionalMoneyBackService = async (
  payloads: AdditionalMoneyBack,
) => {
  const isExistPayment = await prisma.supplierReturnPayments.findFirst({
    where: { id: payloads.supplierReturnPaymentId },
  })

  if (!isExistPayment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid return payment')
  }

  return prisma.$transaction(async tx => {
    const result = await tx.additionalMoneyBack.create({ data: payloads })

    // Calculate new totalPay
    const newTotalPay = isExistPayment.totalPay + payloads.payAmount
    const newTotalDue = isExistPayment.totalDue - payloads.payAmount

    // Update totalPay in supplierSell
    await tx.supplierReturnPayments.update({
      where: { id: payloads.supplierReturnPaymentId },
      data: {
        totalPay: newTotalPay,
        totalDue: newTotalDue,
      },
    })

    return result
  })
}

export const AdditionalMoneyBackService = {
  CreateAdditionalMoneyBackService,
}
