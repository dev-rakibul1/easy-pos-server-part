import { Discounts } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { generateUniqueDiscountId } from '../../../utilities/uniqueIdGenerator'

// Create multiple sell service
const CreateDiscountService = async (payloads: Discounts) => {
  const DiscountId = await generateUniqueDiscountId('d')
  payloads.uniqueId = DiscountId
  const DiscountCreate = await prisma.discounts.create({ data: payloads })
  return DiscountCreate
}

// get all user
const GetAllDiscountService = async () => {
  const result = await prisma.discounts.findMany({})
  return result
}

export const DiscountService = {
  CreateDiscountService,
  GetAllDiscountService,
}
