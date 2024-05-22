import { Customers } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { generateUniqueCustomerId } from '../../../utilities/uniqueIdGenerator'

// Create customer
const CreateCustomerService = async (payload: Customers) => {
  const customerId = await generateUniqueCustomerId('c')
  payload.uniqueId = customerId

  const result = await prisma.customers.create({ data: payload })
  return result
}

// get all customer
const GetAllCustomerService = async () => {
  const result = await prisma.customers.findMany({
    include: {
      purchaseHistory: true,
      payments: true,
    },
  })
  return result
}

export const CustomerService = {
  CreateCustomerService,
  GetAllCustomerService,
}
