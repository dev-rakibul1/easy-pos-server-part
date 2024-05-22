import { Colors } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { generateUniqueColorId } from '../../../utilities/uniqueIdGenerator'

// Create color service
const CreateColorService = async (payloads: Colors) => {
  const colorId = await generateUniqueColorId('col')
  payloads.uniqueId = colorId
  const colorCreate = await prisma.colors.create({ data: payloads })
  return colorCreate
}

// get all color
const GetAllColorService = async () => {
  const result = await prisma.colors.findMany({})
  return result
}

export const ColorService = {
  CreateColorService,
  GetAllColorService,
}
