import { Discounts } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'
import { generateUniqueDiscountId } from '../../../utilities/uniqueIdGenerator'

// Create discount
const CreateDiscountService = async (payloads: Discounts) => {
  const DiscountId = await generateUniqueDiscountId('d')
  payloads.uniqueId = DiscountId
  const DiscountCreate = await prisma.discounts.create({ data: payloads })
  return DiscountCreate
}

// get all discount
const GetAllDiscountService = async () => {
  const result = await prisma.discounts.findMany({})
  return result
}

// Update discount
const UpdateDiscountService = async (
  id: string,
  payloads: Partial<Discounts>,
): Promise<Partial<Discounts>> => {
  const isExist = await prisma.discounts.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid discount.')
  }

  const result = await prisma.discounts.update({
    where: { id: id },
    data: payloads,
  })
  return result
}

export const DiscountService = {
  CreateDiscountService,
  GetAllDiscountService,
  UpdateDiscountService,
}
