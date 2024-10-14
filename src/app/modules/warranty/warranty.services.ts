import { Warranty } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'
import { generateUniqueWarrantyId } from '../../../utilities/uniqueIdGenerator'

// Create warranty service
const CreateWarrantyService = async (payloads: Warranty) => {
  // Check if the product with the same IMEI already exists with an active warranty
  const isExistProduct = await prisma.warranty.findMany({
    where: { imei: payloads.imei },
  })
  //   console.log(isExistProduct)
  const statuses = isExistProduct?.map((item: Warranty) => item.status)

  const isTrue = statuses.every((anItem: Boolean) => {
    return anItem === false
  })

  console.log(isTrue)

  if (!isTrue) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Warranty already submitted!')
  }

  // Generate a unique warranty ID
  const WarrantyId = await generateUniqueWarrantyId('War')

  // Create the new warranty entry in the database
  const createWarranty = await prisma.warranty.create({
    data: {
      ...payloads,
      uniqueId: WarrantyId,
      status: payloads.status ?? true, // Default to true if not provided
    },
  })

  return createWarranty
}

export const WarrantyService = {
  CreateWarrantyService,
}
