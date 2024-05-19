import { Variants } from '@prisma/client'
import prisma from '../../../shared/prisma'

// Create user
const CreateVariantService = async (payload: Variants) => {
  const result = await prisma.variants.create({ data: payload })
  return result
}

// get all user
const GetAllCreateVariantService = async () => {
  const result = await prisma.variants.findMany({
    include: {
      product: true,
    },
  })
  return result
}

export const VariantService = {
  CreateVariantService,
  GetAllCreateVariantService,
}
