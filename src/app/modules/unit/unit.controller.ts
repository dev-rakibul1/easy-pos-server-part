import { Units } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UnitService } from './unit.services'

// Create a unit
const CreateUnitController = CatchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await UnitService.CreateUnitService(payload)

  sendResponse<Units | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unit added success!',
    data: result,
  })
})

// get all Unit
const GetAllUnitController = CatchAsync(async (req: Request, res: Response) => {
  const result = await UnitService.GetAllUnitService()

  sendResponse<Units[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unit get successfully!',
    data: result,
  })
})

export const UnitController = {
  CreateUnitController,
  GetAllUnitController,
}
