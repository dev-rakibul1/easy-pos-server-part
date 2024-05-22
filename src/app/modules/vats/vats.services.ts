import { Vats } from '@prisma/client'
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

export const VatService = {
  CreateVatService,
  GetAllVatService,
}
