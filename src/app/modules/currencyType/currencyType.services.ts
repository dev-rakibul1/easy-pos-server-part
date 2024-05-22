import { CurrencyType } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { generateUniqueCurrencyTypeId } from '../../../utilities/uniqueIdGenerator'

// Create currency type service
const CreateCurrencyTypeService = async (payloads: CurrencyType) => {
  const CurrencyTypeId = await generateUniqueCurrencyTypeId('cti')
  payloads.uniqueId = CurrencyTypeId
  const CurrencyCreate = await prisma.currencyType.create({
    data: payloads,
  })
  return CurrencyCreate
}

// get all currency type
const GetAllCurrencyTypeService = async () => {
  const result = await prisma.currencyType.findMany({})
  return result
}

export const CurrencyTypeService = {
  CreateCurrencyTypeService,
  GetAllCurrencyTypeService,
}
