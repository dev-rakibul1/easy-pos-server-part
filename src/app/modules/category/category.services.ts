import { Categorys } from '@prisma/client'
import prisma from '../../../shared/prisma'

// Create Category service
const CreateCategoryService = async (
  payloads: Categorys,
): Promise<Categorys | null> => {
  const CategoryCreate = await prisma.categorys.create({ data: payloads })
  return CategoryCreate
}

// get all Category
const GetAllCategoryService = async (): Promise<Categorys[] | null> => {
  const result = await prisma.categorys.findMany({})
  return result
}

export const CategoryService = {
  CreateCategoryService,
  GetAllCategoryService,
}
