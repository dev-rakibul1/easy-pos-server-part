import { Shop } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'

// Record shop data
const CreateShopService = async (payloads: Shop): Promise<Shop> => {
  const count = await prisma.shop.count()

  if (count > 0) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Already recorded a shop/company data',
    )
  }

  const result = await prisma.shop.create({ data: payloads })
  return result
}
// Update shop data
const UpdateShopService = async (
  id: string,
  payloads: Partial<Shop>,
): Promise<Partial<Shop> | null> => {
  const result = await prisma.shop.update({
    where: { id: id },
    data: payloads,
  })
  return result
}
// delete shop record
const DeleteShopService = async (id: string): Promise<Shop | null> => {
  const data = await prisma.shop.findFirst({
    where: { id: id },
  })

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid this record!')
  }

  const result = await prisma.shop.delete({
    where: { id: id },
  })
  return result
}

// Single shop get
const GetSingleShopService = async (id: string): Promise<Shop | null> => {
  const data = await prisma.shop.findUnique({
    where: { id: id },
  })

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid this record!')
  }
  return data
}
// Get shop record
const GetShopService = async (): Promise<Shop[] | null> => {
  const result = await prisma.shop.findMany({})
  return result
}
// Get first shop record
const GetFirstShopService = async (): Promise<Shop | null> => {
  const result = await prisma.shop.findFirst()
  return result
}
export const ShopService = {
  CreateShopService,
  UpdateShopService,
  DeleteShopService,
  GetShopService,
  GetSingleShopService,
  GetFirstShopService,
}
