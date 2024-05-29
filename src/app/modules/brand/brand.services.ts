import { Brands } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { generateUniqueBrandId } from '../../../utilities/uniqueIdGenerator'

// Create Brand service
const CreateBrandService = async (payloads: Brands): Promise<Brands | null> => {
  const BrandId = await generateUniqueBrandId('bra')
  payloads.uniqueId = BrandId

  const BrandCreate = await prisma.brands.create({ data: payloads })
  return BrandCreate
}

// get all Brand
const GetAllBrandService = async (): Promise<Brands[] | null> => {
  const result = await prisma.brands.findMany({})
  return result
}

export const BrandService = {
  CreateBrandService,
  GetAllBrandService,
}
