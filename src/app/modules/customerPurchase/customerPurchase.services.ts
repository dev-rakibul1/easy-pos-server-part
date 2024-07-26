import { CustomerPurchase } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'

// Get Supplier Sell By Supplier And User Service
const GetCustomerPurchaseByCustomerAndUserService = async (
  ids: any,
): Promise<CustomerPurchase[]> => {
  try {
    const obj = ids
    const [customerId, userId] = obj.id.split(',')

    const result = await prisma.customerPurchase.findMany({
      where: { customerId: customerId, userId: userId },
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}
// Get Supplier Sell By Supplier And User Service
const GetSingleCustomerPurchaseService = async (
  id: string,
): Promise<CustomerPurchase | null> => {
  const result = await prisma.customerPurchase.findUnique({
    where: { id },
    include: {
      customer: true,
    },
  })

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid customer purchase')
  }
  return result
}
// Get customer purchase by current date
const GetSingleCustomerPurchaseByCurrentDateService = async (): Promise<
  CustomerPurchase[] | null
> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const result = await prisma.customerPurchase.findMany({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      customer: true,
    },
  })

  return result
}

export const CustomerPurchaseService = {
  GetCustomerPurchaseByCustomerAndUserService,
  GetSingleCustomerPurchaseService,
  GetSingleCustomerPurchaseByCurrentDateService,
}
