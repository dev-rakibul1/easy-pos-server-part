import { Colors } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'
import { generateUniqueColorId } from '../../../utilities/uniqueIdGenerator'

// Create color service
const CreateColorService = async (payloads: Colors): Promise<Colors | null> => {
  const colorId = await generateUniqueColorId('col')
  payloads.uniqueId = colorId

  const colorCreate = await prisma.colors.create({ data: payloads })
  return colorCreate
}

// get all color
const GetAllColorService = async (): Promise<Colors[] | null> => {
  const result = await prisma.colors.findMany({})
  return result
}

// Update color
const UpdateColorService = async (
  id: string,
  payloads: Partial<Colors>,
): Promise<Colors | null> => {
  const isExist = await prisma.colors.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid color.')
  }

  const result = await prisma.colors.update({
    where: { id: id },
    data: payloads,
  })
  return result
}

export const ColorService = {
  CreateColorService,
  GetAllColorService,
  UpdateColorService,
}
