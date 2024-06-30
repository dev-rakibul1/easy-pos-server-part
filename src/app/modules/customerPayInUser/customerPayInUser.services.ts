import { CustomerPayInUser } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'

const CreateCustomerPayInUserService = async (payloads: CustomerPayInUser) => {
  const isExistCustomerPurchase = await prisma.customerPurchase.findFirst({
    where: { id: payloads.customerPurchaseId },
  })

  if (!isExistCustomerPurchase) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid purchase')
  }

  return prisma.$transaction(async tx => {
    const result = await tx.customerPayInUser.create({ data: payloads })

    // Calculate new totalPay
    const newTotalPay = isExistCustomerPurchase.totalPay + payloads.payAmount
    const newTotalDue = isExistCustomerPurchase.totalDue - payloads.payAmount

    // Update totalPay in supplierSell
    await tx.customerPurchase.update({
      where: { id: payloads.customerPurchaseId },
      data: {
        totalPay: newTotalPay,
        totalDue: newTotalDue,
      },
    })

    return result
  })
}

export const CustomerPayInUserService = {
  CreateCustomerPayInUserService,
}
