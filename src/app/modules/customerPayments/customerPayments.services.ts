import { CustomerPayments } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { generateUniqueCustomerPaymentId } from '../../../utilities/uniqueIdGenerator'

// Create customer payment
const CreateCustomerPaymentService = async (payload: CustomerPayments) => {
  const customerId = await generateUniqueCustomerPaymentId('cpd')
  payload.uniqueId = customerId

  const result = await prisma.customerPayments.create({ data: payload })
  return result
}

// get all customer payment
const GetAllCustomerPaymentService = async () => {
  const result = await prisma.customerPayments.findMany({
    include: {
      customer: true,
      user: true,
    },
  })
  return result
}

export const CustomerPaymentService = {
  CreateCustomerPaymentService,
  GetAllCustomerPaymentService,
}
