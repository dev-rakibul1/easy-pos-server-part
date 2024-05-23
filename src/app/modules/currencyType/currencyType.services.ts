import { CurrencyType } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
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

// get all currency type
const UpdateCurrencyTypeService = async (
  id: string,
  payloads: Partial<CurrencyType>,
) => {
  const isExist = await prisma.currencyType.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid currency.')
  }

  const result = await prisma.currencyType.update({
    where: { id: id },
    data: payloads,
  })
  return result
}

export const CurrencyTypeService = {
  CreateCurrencyTypeService,
  GetAllCurrencyTypeService,
  UpdateCurrencyTypeService,
}
