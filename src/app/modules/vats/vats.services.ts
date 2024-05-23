import { Vats } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'
import { generateUniqueVatId } from '../../../utilities/uniqueIdGenerator'

// Create Vat service
const CreateVatService = async (payloads: Vats) => {
  const VatId = await generateUniqueVatId('vat')
  payloads.uniqueId = VatId
  const VatCreate = await prisma.vats.create({ data: payloads })
  return VatCreate
}

// get all Vat
const GetAllVatService = async () => {
  const result = await prisma.vats.findMany({})
  return result
}
// get all Vat
const UpdateVatService = async (
  id: string,
  payloads: Partial<Vats>,
): Promise<Partial<Vats>> => {
  const isExist = await prisma.vats.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid vats.')
  }

  const result = await prisma.vats.update({
    where: { id: id },
    data: payloads,
  })
  return result
}

export const VatService = {
  CreateVatService,
  GetAllVatService,
  UpdateVatService,
}
