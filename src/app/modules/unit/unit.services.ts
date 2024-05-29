import { Units } from '@prisma/client'
import prisma from '../../../shared/prisma'

// Create Unit service
const CreateUnitService = async (payloads: Units): Promise<Units | null> => {
  const UnitCreate = await prisma.units.create({ data: payloads })
  return UnitCreate
}

// get all Unit
const GetAllUnitService = async (): Promise<Units[] | null> => {
  const result = await prisma.units.findMany({})
  return result
}

export const UnitService = {
  CreateUnitService,
  GetAllUnitService,
}
