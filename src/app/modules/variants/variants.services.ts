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

// get all user
const DeleteSingleVariantService = async (id: string) => {
  const result = await prisma.variants.delete({ where: { id: id } })
  return result
}

export const VariantService = {
  CreateVariantService,
  GetAllCreateVariantService,
  DeleteSingleVariantService,
}
