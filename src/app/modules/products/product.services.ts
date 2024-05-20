import { Product } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { generateUniqueProductId } from '../../../utilities/uniqueIdGenerator'

// Create user
const CreateUserService = async (payload: Product) => {
  const productId = await generateUniqueProductId('p')
  payload.uniqueId = productId

  // @ts-ignore
  payload.productStock = payload.variants?.length || 0

  // Save the product to the database
  const result = await prisma.product.create({ data: payload })
  return result
}

// get all product
const GetAllCreateUserService = async () => {
  const result = await prisma.product.findMany({
    include: {
      variants: true,
      purchases: true,
    },
  })
  return result
}

// get all product
const SingleProductGetService = async () => {
  const result = await prisma.product.findFirst({
    include: {
      variants: true,
      purchases: true,
    },
  })
  return result
}

export const ProductsService = {
  CreateUserService,
  GetAllCreateUserService,

  SingleProductGetService,
}
