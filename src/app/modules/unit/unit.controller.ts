import { Units } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { UnitService } from './unit.services'

// Create a unit
const CreateUnitController = CatchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await UnitService.CreateUnitService(payload)

  sendResponse<Units>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unit added success!',
    data: result,
  })
})

// get all Unit
const GetAllUnitController = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'unitName'])
  const paginationOptions = pick(req.query, paginationQueryKeys)

  const result = await UnitService.GetAllUnitService(filters, paginationOptions)

  sendResponse<Units[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unit get successfully!',
    meta: result.meta,
    data: result.data,
  })
})
// get single unit
const GetSingleUnitController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await UnitService.GetSingleUnitService(id)

    sendResponse<Units>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single unit get successfully!',
      data: result,
    })
  },
)
// Update single unit
const UpdateUnitController = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const payloads = req.body

  const result = await UnitService.UpdateUnitService(id, payloads)

  sendResponse<Units>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unit updated successfully!',
    data: result,
  })
})
// Delete single unit
const DeleteUnitController = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await UnitService.DeleteUnitService(id)

  sendResponse<Units>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unit Deleted successfully!',
    data: result,
  })
})

export const UnitController = {
  CreateUnitController,
  GetAllUnitController,
  GetSingleUnitController,
  UpdateUnitController,
  DeleteUnitController,
}
